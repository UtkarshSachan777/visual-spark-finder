export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  tags: string[];
  color?: string;
  material?: string;
}

export interface SearchResult {
  product: Product;
  similarity: number;
  confidence: number;
}

export interface UploadedImage {
  file?: File;
  url?: string;
  preview: string;
  name: string;
}

export interface FilterOptions {
  category?: string;
  minSimilarity?: number;
  priceRange?: [number, number];
  sortBy?: 'similarity' | 'price' | 'name';
  sortOrder?: 'asc' | 'desc';
}