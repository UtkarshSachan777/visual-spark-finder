import React, { useState, useCallback } from 'react';
import { Search, Sparkles, TrendingUp, Globe, Zap } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { ProductGrid } from './ProductGrid';
import { FilterPanel } from './FilterPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UploadedImage, SearchResult, FilterOptions } from '@/types/product';
import { VisualSearchService } from '@/services/visualSearchService';

export const VisualSearchInterface: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchStats, setSearchStats] = useState({ totalProducts: 0, processingTime: 0 });
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'similarity',
    sortOrder: 'desc'
  });

  const { toast } = useToast();

  const handleImageUpload = useCallback((image: UploadedImage) => {
    setUploadedImage(image);
    // Auto-search when image is uploaded
    handleSearch(image);
  }, []);

  const handleSearch = useCallback(async (image?: UploadedImage) => {
    const imageToSearch = image || uploadedImage;
    if (!imageToSearch) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setIsInitializing(true);
    setHasSearched(false);

    try {
      const startTime = Date.now();
      
      // Enhanced loading message
      toast({
        title: "🚀 Ultra-Advanced AI Search Starting...",
        description: "Preparing high-precision neural networks",
      });

      // Extract potential search tags from image name or URL
      const searchTags = imageToSearch.name.toLowerCase().split(/[.\-_\s]+/).filter(tag => tag.length > 2);
      
      setIsInitializing(false);
      
      // Use enhanced search with better accuracy
      const results = await VisualSearchService.searchSimilarProducts(
        imageToSearch.file,
        imageToSearch.url,
        searchTags
      );
      
      const processingTime = Date.now() - startTime;
      
      setSearchResults(results);
      setFilteredResults(VisualSearchService.filterResults(results, filters));
      setSearchStats({ totalProducts: results.length, processingTime });
      setHasSearched(true);

      // Enhanced success message
      toast({
        title: "🎯 AI Analysis Complete!",
        description: `Found ${results.length} matches in ${(processingTime / 1000).toFixed(1)}s with ${results.length > 0 ? (results[0].similarity * 100).toFixed(1) + '% top accuracy' : 'high precision'}`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
      setIsInitializing(false);
    }
  }, [uploadedImage, filters, toast]);

  const handleClearImage = useCallback(() => {
    setUploadedImage(null);
    setSearchResults([]);
    setFilteredResults([]);
    setHasSearched(false);
  }, []);

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    if (searchResults.length > 0) {
      setFilteredResults(VisualSearchService.filterResults(searchResults, newFilters));
    }
  }, [searchResults]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters: FilterOptions = { sortBy: 'similarity', sortOrder: 'desc' };
    setFilters(clearedFilters);
    if (searchResults.length > 0) {
      setFilteredResults(VisualSearchService.filterResults(searchResults, clearedFilters));
    }
  }, [searchResults]);

  const loadFeaturedProducts = useCallback(async () => {
    setIsSearching(true);
    try {
      const featured = VisualSearchService.getFeaturedProducts(12);
      setSearchResults(featured);
      setFilteredResults(featured);
      setHasSearched(true);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Load featured products on initial render
  React.useEffect(() => {
    if (!hasSearched && searchResults.length === 0) {
      loadFeaturedProducts();
    }
  }, [loadFeaturedProducts, hasSearched, searchResults.length]);

  const categories = VisualSearchService.getAvailableCategories();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center glow animate-glow-pulse">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Ultra-Advanced AI Visual Search
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Industry-leading accuracy • 100+ Premium Products</span>
                  <Badge variant="secondary" className="ml-2 text-xs bg-primary/10">
                    PROFESSIONAL
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {hasSearched && searchStats.totalProducts > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>{searchStats.totalProducts} results in {(searchStats.processingTime / 1000).toFixed(1)}s</span>
                </div>
              )}
              {uploadedImage && (
                <Button 
                  onClick={() => handleSearch()}
                  disabled={isSearching}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover-lift"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isSearching ? 'Analyzing...' : 'Search Again'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-8">
              {/* Image Upload */}
              <div className="max-w-2xl mx-auto">
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  uploadedImage={uploadedImage}
                  onClearImage={handleClearImage}
                />
              </div>

              {/* Results Header */}
              {hasSearched && (
                <div className="flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {uploadedImage ? 'AI-Powered Similar Products' : 'Premium Featured Collection'}
                    </h2>
                    {uploadedImage && filteredResults.length > 0 && (
                      <div className="flex items-center gap-4 text-muted-foreground animate-slide-up">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">
                            {filteredResults.length} AI matches
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          Top Match: {(filteredResults[0]?.similarity * 100 || 0).toFixed(1)}% accuracy
                        </Badge>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden glass hover:bg-primary/10 transition-all duration-300"
                  >
                    Filters ({Object.values(filters).filter(v => v !== undefined && v !== '').length})
                  </Button>
                </div>
              )}

              {/* Product Grid */}
              <ProductGrid
                results={filteredResults}
                loading={isSearching}
                showSimilarity={!!uploadedImage}
                initializingAI={isInitializing}
              />
            </div>
          </div>

          {/* Filter Panel */}
          <div className="lg:col-span-4 xl:col-span-1">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isVisible={showFilters || window.innerWidth >= 1280}
                onToggle={() => setShowFilters(!showFilters)}
                categories={categories}
                totalResults={filteredResults.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};