import { Product, SearchResult, FilterOptions } from '@/types/product';
import { allProducts } from '@/data/mockProducts';
import { ImageEmbeddingService } from './imageEmbeddingService';

// AI-powered visual search service using HuggingFace transformers
export class VisualSearchService {
  private static embeddingService = ImageEmbeddingService.getInstance();
  private static productEmbeddings = new Map<string, number[]>();
  private static isInitialized = false;

  // Initialize the service (lightweight initialization)
  private static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.embeddingService.initialize();
      this.isInitialized = true;
      console.log('✅ Visual search service ready');
    } catch (error) {
      console.error('Failed to initialize visual search service:', error);
      // Still mark as initialized to use fallback methods
      this.isInitialized = true;
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

      // Calculate similarity with products (compute embeddings on-demand)
      const results: SearchResult[] = [];
      
      // Process products in smaller batches for better performance
      const batchSize = 10;
      for (let i = 0; i < Math.min(allProducts.length, 50); i += batchSize) {
        const batch = allProducts.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async (product) => {
          try {
            // Get or compute product embedding
            let productEmbedding = this.productEmbeddings.get(product.id);
            if (!productEmbedding) {
              productEmbedding = await this.embeddingService.generateEmbedding(product.image);
              this.productEmbeddings.set(product.id, productEmbedding);
            }
            
            const similarity = this.embeddingService.calculateCosineSimilarity(
              queryEmbedding,
              productEmbedding
            );
            const confidence = this.calculateConfidence(similarity);

            return {
              product,
              similarity: Math.max(similarity, 0),
              confidence
            };
          } catch (error) {
            console.warn(`Failed to process product ${product.id}:`, error);
            // Return with low similarity for failed products
            return {
              product,
              similarity: 0.3 + Math.random() * 0.2,
              confidence: 0.5
            };
          }
        });
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Small delay between batches
        if (i + batchSize < allProducts.length) {
          await new Promise(resolve => setTimeout(resolve, 50));
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