import React from 'react';
import { SearchResult } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SimilarityBar } from './SimilarityBar';
import { Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  result: SearchResult;
  showSimilarity?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ result, showSimilarity = true }) => {
  const { product, similarity } = result;

  return (
    <Card className="group overflow-hidden glass border-border/50 hover:border-primary/40 transition-all duration-500 hover-lift animate-scale-in">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {showSimilarity && (
          <div className="absolute top-3 right-3">
            <Badge 
              variant="secondary" 
              className="glass text-xs font-bold bg-primary/90 text-primary-foreground border-0 glow"
            >
              {Math.round(similarity * 100)}% match
            </Badge>
          </div>
        )}

        {/* Floating action buttons */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-full glass hover:bg-primary/20 border-0"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating quick view button */}
        <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            size="sm" 
            className="w-full glass bg-white/10 text-white hover:bg-white/20 border-white/20"
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground capitalize font-medium">
            {product.category}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          {product.brand && (
            <Badge variant="outline" className="text-xs glass border-primary/30">
              {product.brand}
            </Badge>
          )}
        </div>

        {showSimilarity && (
          <SimilarityBar similarity={similarity} />
        )}

        {/* Color indicator */}
        {product.color && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Color:</span>
            <div 
              className="w-4 h-4 rounded-full border-2 border-border glow"
              style={{ 
                backgroundColor: product.color.toLowerCase() === 'white' ? '#ffffff' : 
                                  product.color.toLowerCase() === 'black' ? '#000000' :
                                  product.color.toLowerCase() === 'red' ? '#ef4444' :
                                  product.color.toLowerCase() === 'blue' ? '#3b82f6' :
                                  product.color.toLowerCase() === 'green' ? '#22c55e' :
                                  product.color.toLowerCase() === 'gray' ? '#6b7280' :
                                  product.color.toLowerCase() === 'brown' ? '#a3a3a3' :
                                  '#6b7280'
              }}
            />
            <span className="text-xs text-muted-foreground font-medium">{product.color}</span>
          </div>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};