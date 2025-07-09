
import React from 'react';
import type { Agent } from '@/types/agent';

interface WelcomeStateProps {
  activeAgent?: Agent;
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({ activeAgent }) => {
  return (
    <div className="flex items-center justify-center min-h-full py-12">
      <div className="text-center space-y-6 p-8">
        {/* Agent avatar with violet glow */}
        <div className="relative mx-auto w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 animate-pulse"></div>
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/10 to-violet-600/10 backdrop-blur-xl border border-purple-500/20 flex items-center justify-center shadow-lg shadow-purple-500/10">
            <div className="text-3xl">{activeAgent?.avatar || '💭'}</div>
          </div>
        </div>
        
        <h3 className="text-2xl font-light text-white/80 bg-gradient-to-r from-white via-purple-100 to-violet-100 bg-clip-text text-transparent">
          Ready to begin with {activeAgent?.name}
        </h3>
        <p className="text-sm text-muted-foreground/60 font-light max-w-md mx-auto">
          {activeAgent?.specialty || 'Start a conversation and explore endless possibilities'}
        </p>
        <div className="text-xs text-white/30 font-light mt-4">
          Press Ctrl+F to search conversations
        </div>
      </div>
    </div>
  );
};
