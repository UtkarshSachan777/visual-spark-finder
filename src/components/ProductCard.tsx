import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchResult } from '@/types/product';

interface ProductCardProps {
  result: SearchResult;
  showSimilarity?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  result, 
  showSimilarity = true 
}) => {
  const { product, similarity, confidence } = result;

  const getSimilarityColor = (score: number) => {
    if (score >= 0.8) return 'bg-gradient-primary text-primary-foreground';
    if (score >= 0.6) return 'bg-gradient-accent text-accent-foreground';
    return 'bg-secondary text-secondary-foreground';
  };

  const getSimilarityText = (score: number) => {
    if (score >= 0.9) return 'Excellent Match';
    if (score >= 0.7) return 'Good Match';
    if (score >= 0.5) return 'Fair Match';
    return 'Low Match';
  };

  return (
    <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {showSimilarity && (
          <div className="absolute top-3 left-3">
            <Badge 
              className={`${getSimilarityColor(similarity)} shadow-soft text-xs font-medium`}
            >
              {Math.round(similarity * 100)}% Match
            </Badge>
          </div>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full bg-white/90 text-foreground hover:bg-white hover:text-destructive"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button 
            size="sm" 
            className="w-full bg-white/90 text-foreground hover:bg-white"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>
            <span className="text-lg font-bold text-primary flex-shrink-0">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {product.brand}
            </span>
          </div>

          {showSimilarity && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-muted-foreground">
                  {getSimilarityText(similarity)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Confidence: {Math.round(confidence * 100)}%
              </div>
            </div>
          )}

          {product.color && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">Color:</span>
              <div 
                className="w-4 h-4 rounded-full border border-border"
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
              <span className="text-xs text-muted-foreground">{product.color}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};