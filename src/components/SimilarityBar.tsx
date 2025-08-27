import React from 'react';

interface SimilarityBarProps {
  similarity: number;
  showLabel?: boolean;
  className?: string;
}

export const SimilarityBar: React.FC<SimilarityBarProps> = ({ 
  similarity, 
  showLabel = true,
  className = ""
}) => {
  const percentage = Math.round(similarity * 100);
  
  const getColorClass = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-400';
    if (score >= 60) return 'bg-gradient-to-r from-yellow-500 to-orange-400';
    return 'bg-gradient-to-r from-red-500 to-pink-400';
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground font-medium">AI Match</span>
          <span className="font-bold text-primary">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColorClass(percentage)} glow`}
          style={{ 
            width: `${percentage}%`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      </div>
    </div>
  );
};