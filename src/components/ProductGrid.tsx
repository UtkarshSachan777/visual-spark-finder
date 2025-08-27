import React from 'react';
import { SearchResult } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Loader2, Package } from 'lucide-react';

interface ProductGridProps {
  results: SearchResult[];
  loading?: boolean;
  showSimilarity?: boolean;
  initializingAI?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  results, 
  loading = false, 
  showSimilarity = true,
  initializingAI = false
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-glow-pulse">
            <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
          </div>
          <div className="space-y-3">
            <p className="text-xl font-semibold">
              {initializingAI ? '🤖 Initializing AI model...' : '🔍 Analyzing image with AI...'}
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              {initializingAI 
                ? 'Loading visual recognition model (first time may take longer)'
                : 'Comparing visual features to find similar products using machine learning'
              }
            </p>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            <p className="text-xl font-semibold">No products found</p>
            <p className="text-sm text-muted-foreground max-w-md">
              Try adjusting your filters or upload a different image for better AI matching results
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {results.map((result, index) => (
        <div 
          key={result.product.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard
            result={result}
            showSimilarity={showSimilarity}
          />
        </div>
      ))}
    </div>
  );
};