
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const LandingHeader: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-white font-semibold text-xl">NGX Agents</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white/70 hover:text-white transition-colors">
            Features
          </a>
          <a href="#demo" className="text-white/70 hover:text-white transition-colors">
            Demo
          </a>
          <Link to="/sign-in" className="text-white/70 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/sign-up">
            <Button 
              variant="outline" 
              className="glass-premium border-white/20 text-white hover:bg-white/10"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
