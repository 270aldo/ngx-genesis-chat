
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles } from 'lucide-react';
import { EnergyLines } from './EnergyLines';

export const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Advanced AI Agent System';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <EnergyLines />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="floating-animation">
          <div className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full border border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/80">Next-Generation Intelligence</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            NGX
          </span>
          <br />
          <span className="text-white/90 text-4xl md:text-6xl">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Experience the future of conversational AI with our sophisticated multi-agent system. 
          Premium interface meets cutting-edge intelligence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/chat">
            <button className="premium-glow-button">
              <span>Start Conversation</span>
            </button>
          </Link>
          
          <button 
            className="rainbow-button"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Explore Features</span>
          </button>
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};
