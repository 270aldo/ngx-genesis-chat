
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const LandingHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-ultra border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl glass-premium border border-blue-500/20 flex items-center justify-center glow-subtle">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xl font-semibold text-white">NGX Agents</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
          <a href="#demo" className="text-white/70 hover:text-white transition-colors">Demo</a>
          <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
        </nav>

        <Link to="/chat">
          <Button className="premium-button glass-premium border border-blue-500/20 text-white hover:bg-blue-500/10 glow-subtle">
            Launch App
          </Button>
        </Link>
      </div>
    </header>
  );
};
