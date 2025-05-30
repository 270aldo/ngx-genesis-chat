
import React from 'react';
import { cn } from '@/lib/utils';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const StarBorder: React.FC<StarBorderProps> = ({ children, className }) => {
  return (
    <div className={cn("relative group", className)}>
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 p-[1px] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-transparent rounded-lg w-full h-full" />
      </div>
      
      {/* Star particles effect */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute top-1 left-1 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute top-3 right-2 w-0.5 h-0.5 bg-violet-300/60 rounded-full animate-pulse delay-75" />
        <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-purple-300/50 rounded-full animate-pulse delay-150" />
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-300" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
