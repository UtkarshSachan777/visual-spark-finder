import React, { useCallback, useState } from 'react';
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadedImage } from '@/types/product';

interface ImageUploadProps {
  onImageUpload: (image: UploadedImage) => void;
  uploadedImage?: UploadedImage | null;
  onClearImage: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
  onClearImage
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onImageUpload({
        file,
        preview,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) return;
    
    try {
      new URL(imageUrl); // Validate URL
      onImageUpload({
        url: imageUrl,
        preview: imageUrl,
        name: 'URL Image'
      });
      setImageUrl('');
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive"
      });
    }
  };

  if (uploadedImage) {
    return (
      <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-500 hover-lift animate-scale-in">
        <div className="relative p-6">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-destructive/90 text-destructive-foreground hover:bg-destructive border-0 glow"
            onClick={onClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="aspect-square w-full max-w-md mx-auto">
            <img
              src={uploadedImage.preview}
              alt="Uploaded image"
              className="w-full h-full object-cover rounded-xl shadow-glow transition-all duration-500 hover:scale-105"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center font-medium">
            {uploadedImage.name}
          </p>
          <div className="mt-2 text-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              ✨ Ready for AI analysis
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass border-primary/20 hover:border-primary/30 transition-all duration-500 animate-fade-in">
      <div className="p-6 space-y-6">
        {/* Drag & Drop Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-500 ${
            dragActive 
              ? 'border-primary bg-primary/5 shadow-glow scale-105' 
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 hover:shadow-soft'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center transition-all duration-500 animate-float ${
              dragActive ? 'scale-110 glow' : 'hover:scale-105 hover:glow'
            }`}>
              <Upload className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Drop your image here
              </h3>
              <p className="text-muted-foreground mt-2">
                or click to browse files
              </p>
              <p className="text-xs text-muted-foreground mt-3 opacity-75">
                Supports: JPG, PNG, GIF (max 10MB)
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 py-1 text-muted-foreground rounded-full border border-border/50">
              Or use image URL
            </span>
          </div>
        </div>

        {/* URL Input */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="pl-10 glass border-border/50 focus:border-primary/50 transition-all duration-300"
              onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
            />
          </div>
          <Button 
            onClick={handleUrlSubmit}
            disabled={!imageUrl.trim()}
            variant="outline"
            className="px-4 glass border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};