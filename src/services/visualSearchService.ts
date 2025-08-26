import { Product, SearchResult, FilterOptions } from '@/types/product';
import { allProducts } from '@/data/mockProducts';

// Simulated visual search service
// In a real implementation, this would use ML/AI services like Google Vision API, AWS Rekognition, etc.
export class VisualSearchService {
  // Simulate visual analysis delay
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Simulate visual similarity scoring based on product attributes
  private static calculateSimilarity(product: Product, searchTags?: string[]): number {
    let baseScore = Math.random() * 0.4 + 0.3; // Random base between 0.3-0.7
    
    // Boost score for certain categories or attributes
    if (searchTags) {
      const productTags = [...product.tags, product.category.toLowerCase(), product.name.toLowerCase()];
      const matches = searchTags.filter(tag => 
        productTags.some(pTag => pTag.includes(tag.toLowerCase()))
      );
      
      if (matches.length > 0) {
        baseScore += matches.length * 0.1; // Boost for tag matches
      }
    }

    // Add some variation based on product properties
    if (product.category === 'Electronics') baseScore += 0.05;
    if (product.category === 'Fashion') baseScore += 0.1;
    
    return Math.min(baseScore, 0.95); // Cap at 95%
  }

  // Simulate confidence scoring
  private static calculateConfidence(similarity: number): number {
    // Higher similarity generally means higher confidence
    return Math.min(similarity + Math.random() * 0.2 - 0.1, 0.98);
  }

  // Main search function
  static async searchSimilarProducts(
    imageFile?: File,
    imageUrl?: string,
    searchTags?: string[]
  ): Promise<SearchResult[]> {
    // Simulate processing time
    await this.delay(1500 + Math.random() * 1000);

    // In a real implementation, you would:
    // 1. Send image to ML service for feature extraction
    // 2. Compare against product image database
    // 3. Return ranked results with similarity scores

    // For demo purposes, we'll simulate this with random scoring
    const results: SearchResult[] = allProducts.map(product => {
      const similarity = this.calculateSimilarity(product, searchTags);
      const confidence = this.calculateConfidence(similarity);

      return {
        product,
        similarity,
        confidence
      };
    });

    // Sort by similarity (highest first)
    results.sort((a, b) => b.similarity - a.similarity);

    // Return top 24 results for better UX
    return results.slice(0, 24);
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