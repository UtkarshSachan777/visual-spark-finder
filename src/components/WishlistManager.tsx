import React, { useState, useEffect } from 'react';
import { Heart, X, ShoppingCart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

interface WishlistManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistManager: React.FC<WishlistManagerProps> = ({
  isOpen,
  onClose
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('ai-visual-search-wishlist');
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        setWishlistItems(items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, [isOpen]);

  const removeFromWishlist = (productId: string) => {
    const updatedItems = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedItems);
    localStorage.setItem('ai-visual-search-wishlist', JSON.stringify(updatedItems));
    
    toast({
      title: "Removed from wishlist",
      description: "Product has been removed from your wishlist",
    });
  };

  const shareWishlist = async () => {
    try {
      const wishlistText = `My AI Visual Search Wishlist:\n${wishlistItems.map(item => 
        `• ${item.product.name} - ₹${item.product.price.toLocaleString('en-IN')}`
      ).join('\n')}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'My Product Wishlist',
          text: wishlistText
        });
      } else {
        await navigator.clipboard.writeText(wishlistText);
        toast({
          title: "Wishlist copied!",
          description: "Your wishlist has been copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing wishlist:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
      <div className="absolute inset-4 bg-background/95 backdrop-blur-lg rounded-2xl border border-border/50 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
              My Wishlist
            </h2>
            <p className="text-muted-foreground">
              {wishlistItems.length} saved products
            </p>
          </div>
          <div className="flex items-center gap-2">
            {wishlistItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={shareWishlist}
                className="glass"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-auto h-[calc(100%-5rem)]">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-4">
                Start adding products you love to keep track of them
              </p>
              <Button onClick={onClose} className="bg-gradient-primary">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="glass hover-lift group">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-destructive/20 text-white hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.product.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.product.brand}
                        </Badge>
                      </div>

                      <div className="text-lg font-bold text-primary">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Added {item.addedAt.toLocaleDateString()}
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-primary text-xs"
                      >
                        <ShoppingCart className="h-3 w-3 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Utility functions for wishlist management
export const addToWishlist = (product: Product): void => {
  const existingWishlist = localStorage.getItem('ai-visual-search-wishlist');
  const wishlist: WishlistItem[] = existingWishlist ? JSON.parse(existingWishlist) : [];
  
  // Check if product already exists
  if (wishlist.find(item => item.id === product.id)) {
    return; // Already in wishlist
  }
  
  const newItem: WishlistItem = {
    id: product.id,
    product,
    addedAt: new Date()
  };
  
  wishlist.push(newItem);
  localStorage.setItem('ai-visual-search-wishlist', JSON.stringify(wishlist));
};

export const removeFromWishlist = (productId: string): void => {
  const existingWishlist = localStorage.getItem('ai-visual-search-wishlist');
  if (!existingWishlist) return;
  
  const wishlist: WishlistItem[] = JSON.parse(existingWishlist);
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  
  localStorage.setItem('ai-visual-search-wishlist', JSON.stringify(updatedWishlist));
};

export const isInWishlist = (productId: string): boolean => {
  const existingWishlist = localStorage.getItem('ai-visual-search-wishlist');
  if (!existingWishlist) return false;
  
  const wishlist: WishlistItem[] = JSON.parse(existingWishlist);
  return wishlist.some(item => item.id === productId);
};