
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
        
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white animate-slide-up" style={{ animationDelay: '100ms' }}>
          Good morning.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
          How can I help you today?
        </p>
      </div>
    </div>
  );
};
