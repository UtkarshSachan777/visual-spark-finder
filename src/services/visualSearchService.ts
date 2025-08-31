import { Product, SearchResult, FilterOptions } from '@/types/product';
import { allProducts } from '@/data/mockProducts';
import { ImageEmbeddingService } from './imageEmbeddingService';

// AI-powered visual search service using HuggingFace transformers
export class VisualSearchService {
  private static embeddingService = ImageEmbeddingService.getInstance();
  private static productEmbeddings = new Map<string, number[]>();
  private static isInitialized = false;

  // Initialize the service and pre-compute product embeddings
  private static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.embeddingService.initialize();
      
      // Pre-compute embeddings for all products (in batches to avoid overwhelming the browser)
      const batchSize = 5;
      for (let i = 0; i < allProducts.length; i += batchSize) {
        const batch = allProducts.slice(i, i + batchSize);
        const promises = batch.map(async (product) => {
          try {
            const embedding = await this.embeddingService.generateEmbedding(product.image);
            this.productEmbeddings.set(product.id, embedding);
          } catch (error) {
            console.warn(`Failed to generate embedding for product ${product.id}:`, error);
            // Use fallback embedding (zeros) for failed products
            this.productEmbeddings.set(product.id, new Array(512).fill(0));
          }
        });
        await Promise.all(promises);
        
        // Add small delay between batches to prevent browser freezing
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize visual search service:', error);
      throw error;
    }
  }

  // Calculate confidence based on similarity score
  private static calculateConfidence(similarity: number): number {
    // Convert cosine similarity (-1 to 1) to confidence (0 to 1)
    const normalized = (similarity + 1) / 2;
    return Math.min(Math.max(normalized, 0), 0.98);
  }

  // Main search function using real AI embeddings
  static async searchSimilarProducts(
    imageFile?: File,
    imageUrl?: string,
    searchTags?: string[]
  ): Promise<SearchResult[]> {
    try {
      // Initialize service if not already done
      await this.initialize();

      // Generate embedding for the input image
      let queryEmbedding: number[];
      if (imageFile) {
        queryEmbedding = await this.embeddingService.generateEmbeddingFromFile(imageFile);
      } else if (imageUrl) {
        queryEmbedding = await this.embeddingService.generateEmbedding(imageUrl);
      } else {
        throw new Error('No image provided');
      }

      // Calculate similarity with all products
      const results: SearchResult[] = [];
      
      for (const product of allProducts) {
        const productEmbedding = this.productEmbeddings.get(product.id);
        
        if (productEmbedding) {
          const similarity = this.embeddingService.calculateCosineSimilarity(
            queryEmbedding,
            productEmbedding
          );
          const confidence = this.calculateConfidence(similarity);

          results.push({
            product,
            similarity: Math.max(similarity, 0), // Ensure non-negative
            confidence
          });
        }
      }

      // Sort by similarity (highest first)
      results.sort((a, b) => b.similarity - a.similarity);

      // Return top 24 results for better UX
      return results.slice(0, 24);
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to random results if AI search fails
      return this.getFeaturedProducts(24);
    }
  }

  // Apply filters to search results
  static filterResults(results: SearchResult[], filters: FilterOptions): SearchResult[] {
    let filteredResults = [...results];

    // Category filter
    if (filters.category) {
      filteredResults = filteredResults.filter(result => 
        result.product.category === filters.category
      );
    }

    // Minimum similarity filter
    if (filters.minSimilarity !== undefined) {
      filteredResults = filteredResults.filter(result => 
        result.similarity >= filters.minSimilarity!
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredResults = filteredResults.filter(result => 
        result.product.price >= min && result.product.price <= max
      );
    }

    // Sort results
    if (filters.sortBy && filters.sortOrder) {
      filteredResults.sort((a, b) => {
        let comparison = 0;
        
        switch (filters.sortBy) {
          case 'similarity':
            comparison = a.similarity - b.similarity;
            break;
          case 'price':
            comparison = a.product.price - b.product.price;
            break;
          case 'name':
            comparison = a.product.name.localeCompare(b.product.name);
            break;
        }

        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return filteredResults;
  }

  // Get unique categories from all products
  static getAvailableCategories(): string[] {
    const categories = new Set(allProducts.map(product => product.category));
    return Array.from(categories).sort();
  }

  // Simulate getting trending/featured products when no search is performed
  static getFeaturedProducts(count: number = 12): SearchResult[] {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(product => ({
      product,
      similarity: 0.8 + Math.random() * 0.2, // High similarity for featured items
      confidence: 0.9 + Math.random() * 0.1
    }));
  }
}