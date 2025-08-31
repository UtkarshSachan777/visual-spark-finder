import React from 'react';
import { Search, Sparkles, TrendingUp, Zap, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LandingHeroProps {
  onScrollToUpload: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onScrollToUpload }) => {
  return (
    <div className="relative min-h-screen bg-gradient-subtle overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Hero Badge */}
          <div className="flex justify-center animate-slide-up">
            <Badge className="px-6 py-2 bg-gradient-primary text-primary-foreground border-0 glow text-sm font-bold">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced AI Vision
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight animate-scale-in">
            Find Products by
            <br />
            <span className="relative">
              Visual Similarity
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary opacity-30"></div>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-300">
            Upload any product image and discover visually similar items from our extensive Indian marketplace using cutting-edge AI technology.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 animate-fade-in animation-delay-500">
            <div className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-500 hover-lift">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto glow">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">AI Vision Analysis</h3>
              <p className="text-sm text-muted-foreground">Advanced CLIP model analyzes visual features, colors, shapes, and patterns</p>
            </div>

            <div className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-500 hover-lift">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto glow">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Smart Matching</h3>
              <p className="text-sm text-muted-foreground">Real-time similarity scoring with 95%+ accuracy for Indian products</p>
            </div>

            <div className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-500 hover-lift">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto glow">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">WebGPU acceleration for instant results from 100+ product database</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 space-y-6 animate-fade-in animation-delay-700">
            <Button 
              onClick={onScrollToUpload}
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover-lift text-lg px-8 py-6 rounded-2xl font-bold"
            >
              <Search className="h-5 w-5 mr-3" />
              Start Visual Search
            </Button>
            
            <p className="text-sm text-muted-foreground">
              ✨ No signup required • 🚀 Instant results • 🔒 Privacy protected
            </p>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in animation-delay-1000">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">100+</div>
              <div className="text-sm text-muted-foreground font-medium">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">95%</div>
              <div className="text-sm text-muted-foreground font-medium">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">&lt;2s</div>
              <div className="text-sm text-muted-foreground font-medium">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 animate-float animation-delay-1000">
        <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
      </div>
      <div className="absolute top-1/3 right-20 animate-float animation-delay-2000">
        <div className="w-6 h-6 bg-purple-400/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/4 right-10 animate-float animation-delay-3000">
        <div className="w-10 h-10 bg-yellow-400/20 rounded-full"></div>
      </div>
    </div>
  );
};