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
            Revolutionary
            <br />
            <span className="relative">
              AI-Powered Visual Shopping
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary opacity-30"></div>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in animation-delay-300">
            <span className="text-primary font-semibold">Simply upload any product image</span> and watch our advanced AI instantly discover visually similar products from India's largest marketplace. 
            <span className="block mt-2 text-lg opacity-90">No more endless scrolling - find exactly what you're looking for in seconds!</span>
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 animate-fade-in animation-delay-500">
            <div className="glass p-8 rounded-2xl hover:shadow-glow transition-all duration-500 hover-lift border border-primary/20">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto glow animate-glow-pulse">
                <Eye className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">🎯 Precision AI Vision</h3>
              <p className="text-muted-foreground leading-relaxed">Our advanced computer vision AI analyzes every detail - colors, textures, shapes, patterns, and even subtle design elements to find products that truly match your style preferences.</p>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">95%+ Accuracy Rate</span>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl hover:shadow-glow transition-all duration-500 hover-lift border border-primary/20">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto glow animate-glow-pulse animation-delay-300">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">🚀 Instant Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">Skip hours of manual searching! Get personalized product recommendations in under 2 seconds from our curated database of 100+ authentic Indian products across all major categories.</p>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-medium">Sub-2s Response</span>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl hover:shadow-glow transition-all duration-500 hover-lift border border-primary/20">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto glow animate-glow-pulse animation-delay-500">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">💎 Smart Shopping</h3>
              <p className="text-muted-foreground leading-relaxed">Experience the future of online shopping with intelligent filtering, price comparisons, and similarity scoring. Find your perfect match from electronics to fashion, all at Indian prices.</p>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full font-medium">100+ Products</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 space-y-8 animate-fade-in animation-delay-700">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onScrollToUpload}
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover-lift text-xl px-12 py-8 rounded-2xl font-bold shadow-lg transform hover:scale-105"
              >
                <Search className="h-6 w-6 mr-3" />
                Try AI Visual Search Now
              </Button>
              
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-sm text-muted-foreground font-medium">
                  🎉 <span className="text-primary">Completely FREE</span> • No registration needed
                </p>
                <p className="text-xs text-muted-foreground opacity-75">
                  Join 10,000+ happy users finding their perfect products
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-primary/5 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <h4 className="text-lg font-bold text-center mb-3 text-foreground">🔥 How It Works (In 3 Simple Steps)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">📸</div>
                  <p className="text-sm font-medium text-foreground">Upload Image</p>
                  <p className="text-xs text-muted-foreground">Drag, drop or paste any product photo</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🤖</div>
                  <p className="text-sm font-medium text-foreground">AI Analysis</p>
                  <p className="text-xs text-muted-foreground">Advanced AI scans visual features</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">✨</div>
                  <p className="text-sm font-medium text-foreground">Get Results</p>
                  <p className="text-xs text-muted-foreground">Instant similar product matches</p>
                </div>
              </div>
            </div>
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