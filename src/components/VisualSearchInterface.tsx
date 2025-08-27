import React, { useState, useCallback } from 'react';
import { Search, Sparkles, TrendingUp } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { ProductGrid } from './ProductGrid';
import { FilterPanel } from './FilterPanel';
import { Button } from '@/components/ui/button';
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
      // Show initialization message on first search
      toast({
        title: "Initializing AI model...",
        description: "This may take a moment on first use",
      });

      // Extract potential search tags from image name or URL
      const searchTags = imageToSearch.name.toLowerCase().split(/[.\-_\s]+/).filter(tag => tag.length > 2);
      
      setIsInitializing(false);
      
      const results = await VisualSearchService.searchSimilarProducts(
        imageToSearch.file,
        imageToSearch.url,
        searchTags
      );
      
      setSearchResults(results);
      setFilteredResults(VisualSearchService.filterResults(results, filters));
      setHasSearched(true);

      toast({
        title: "AI search completed!",
        description: `Found ${results.length} visually similar products`,
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
      <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Visual Product Matcher</h1>
                <p className="text-sm text-muted-foreground">Find products by image similarity</p>
              </div>
            </div>
            
            {uploadedImage && (
              <Button 
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isSearching ? 'Searching...' : 'Search Again'}
              </Button>
            )}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {uploadedImage ? 'Similar Products' : 'Featured Products'}
                    </h2>
                    {uploadedImage && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">
                          {filteredResults.length} matches found
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
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