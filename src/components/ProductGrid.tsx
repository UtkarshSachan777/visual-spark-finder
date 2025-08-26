import React from 'react';
import { SearchResult } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Loader2, Package } from 'lucide-react';

interface ProductGridProps {
  results: SearchResult[];
  loading?: boolean;
  showSimilarity?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  results, 
  loading = false, 
  showSimilarity = true 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-slow">
            <Loader2 className="h-6 w-6 text-primary-foreground animate-spin" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Finding similar products...</p>
            <p className="text-sm text-muted-foreground">
              Analyzing your image for visual matches
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or upload a different image
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {results.map((result) => (
        <ProductCard
          key={result.product.id}
          result={result}
          showSimilarity={showSimilarity}
        />
      ))}
    </div>
  );
};