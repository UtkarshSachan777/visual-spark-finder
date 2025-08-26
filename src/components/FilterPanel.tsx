import React from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FilterOptions } from '@/types/product';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isVisible: boolean;
  onToggle: () => void;
  categories: string[];
  totalResults: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isVisible,
  onToggle,
  categories,
  totalResults
}) => {
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && !Array.isArray(value)
  );

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-10">
        <Button
          onClick={onToggle}
          className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-accent"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-2 bg-accent text-accent-foreground">
              {Object.values(filters).filter(v => v !== undefined && v !== '').length}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto lg:mx-0 shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-primary" />
            Filters
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {totalResults} products found
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Category</label>
          <Select 
            value={filters.category || ''} 
            onValueChange={(value) => updateFilter('category', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Similarity Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Minimum Similarity</label>
            <Badge variant="outline" className="text-xs">
              {Math.round((filters.minSimilarity || 0) * 100)}%
            </Badge>
          </div>
          <Slider
            value={[filters.minSimilarity || 0]}
            onValueChange={([value]) => updateFilter('minSimilarity', value)}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Price Range</label>
            <Badge variant="outline" className="text-xs">
              ${filters.priceRange?.[0] || 0} - ${filters.priceRange?.[1] || 500}
            </Badge>
          </div>
          <Slider
            value={filters.priceRange || [0, 500]}
            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>

        <Separator />

        {/* Sort Options */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Sort By</label>
          <Select 
            value={filters.sortBy || 'similarity'} 
            onValueChange={(value) => updateFilter('sortBy', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="similarity">Best Match</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Order</label>
          <Select 
            value={filters.sortOrder || 'desc'} 
            onValueChange={(value) => updateFilter('sortOrder', value as 'asc' | 'desc')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">High to Low</SelectItem>
              <SelectItem value="asc">Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <>
            <Separator />
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};