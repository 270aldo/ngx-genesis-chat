
import React from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900/50 to-indigo-950 relative overflow-hidden">
      {/* Background effects - Violet theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-purple-600/8 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/8 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <ChatLayout />
    </div>
  );
};

export default Index;
