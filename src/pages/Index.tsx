
import React from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: `
        linear-gradient(135deg, #1a0b2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a0b2e 100%),
        radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(139, 69, 255, 0.2) 0%, transparent 50%)
      `
    }}>
      {/* Background effects - Violet theme matching the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-purple-500/15 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/15 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Animated background particles with stronger violet */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-3/4 left-1/2 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <ChatLayout />
    </div>
  );
};

export default Index;
