import { pipeline } from '@huggingface/transformers';

export class ImageEmbeddingService {
  private static instance: ImageEmbeddingService;
  private featureExtractor: any = null;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ImageEmbeddingService {
    if (!ImageEmbeddingService.instance) {
      ImageEmbeddingService.instance = new ImageEmbeddingService();
    }
    return ImageEmbeddingService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Using CLIP model for image feature extraction - smaller model for better performance
      this.featureExtractor = await pipeline(
        'feature-extraction',
        'Xenova/clip-vit-base-patch32'
      );
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize image embedding service:', error);
      throw error;
    }
  }

  async generateEmbedding(imageUrl: string): Promise<number[]> {
    if (!this.isInitialized || !this.featureExtractor) {
      await this.initialize();
    }

    try {
      // Create image element to load the image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      return new Promise((resolve, reject) => {
        img.onload = async () => {
          try {
            // Extract features using the pipeline
            const result = await this.featureExtractor!(img);
            
            // Convert tensor to array and normalize
            const embedding: number[] = Array.from(result.data as number[]);
            const normalizedEmbedding = this.normalizeVector(embedding);
            resolve(normalizedEmbedding);
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => {
          reject(new Error(`Failed to load image: ${imageUrl}`));
        };
        
        img.src = imageUrl;
      });
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  async generateEmbeddingFromFile(file: File): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target?.result as string;
          const embedding = await this.generateEmbedding(dataUrl);
          resolve(embedding);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  calculateCosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }

  private normalizeVector(vector: number[]): number[] {
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return magnitude === 0 ? vector : vector.map(val => val / magnitude);
  }
}