
import React from 'react';
import { cn } from '@/lib/utils';
import type { Agent } from '@/types/agent';

interface WelcomeStateProps {
  activeAgent?: Agent;
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({ activeAgent }) => {
  return (
    <div className="flex items-center justify-center min-h-full py-12">
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl mb-6 opacity-30">{activeAgent?.avatar || '💭'}</div>
        <h3 className="text-2xl font-light text-white/80">
          Ready to begin with {activeAgent?.name}
        </h3>
        <p className="text-sm text-muted-foreground/60 font-light">
          {activeAgent?.specialty || 'Start a conversation and explore endless possibilities'}
        </p>
        <div className="text-xs text-white/30 font-light mt-4">
          Press Ctrl+F to search conversations
        </div>
      </div>
    </div>
  );
};
