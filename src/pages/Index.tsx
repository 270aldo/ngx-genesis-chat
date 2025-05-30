
import React from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background effects - Consistent violet theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 h-screen">
        <ChatLayout />
      </div>
    </div>
  );
};

export default Index;
