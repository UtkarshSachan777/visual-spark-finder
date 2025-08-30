import React from 'react';
import { X, Star, ShoppingCart, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SearchResult } from '@/types/product';
import { SimilarityBar } from './SimilarityBar';

interface ProductComparisonProps {
  products: SearchResult[];
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  onClose,
  onRemoveProduct
}) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
      <div className="absolute inset-4 bg-background/95 backdrop-blur-lg rounded-2xl border border-border/50 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Product Comparison
            </h2>
            <p className="text-muted-foreground">
              Compare {products.length} selected products side by side
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="overflow-auto h-[calc(100%-5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {products.map((result) => (
              <Card key={result.product.id} className="glass hover-lift relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveProduct(result.product.id)}
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive/10 hover:bg-destructive/20 text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>

                <CardContent className="p-6">
                  <div className="aspect-square relative mb-4 rounded-xl overflow-hidden">
                    <img
                      src={result.product.image}
                      alt={result.product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                        {result.product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {result.product.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {result.product.brand}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">AI Match</span>
                        <span className="text-sm font-medium">
                          {(result.similarity * 100).toFixed(1)}%
                        </span>
                      </div>
                      <SimilarityBar similarity={result.similarity} />
                    </div>

                    <div className="text-2xl font-bold text-primary">
                      ₹{result.product.price.toLocaleString('en-IN')}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {result.product.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Color:</span>
                        <span className="font-medium">{result.product.color}</span>
                      </div>
                      {result.product.material && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Material:</span>
                          <span className="font-medium">{result.product.material}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <Button size="sm" className="flex-1 bg-gradient-primary">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                      <Button variant="outline" size="sm" className="hover:text-red-500">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};