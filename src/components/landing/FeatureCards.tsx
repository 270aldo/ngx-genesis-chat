
import React from 'react';
import { Sparkles, Shield, ArrowUp } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Advanced AI Agents',
    description: 'Multi-agent system with specialized capabilities for complex reasoning and task execution.',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: ArrowUp,
    title: 'Real-time Processing',
    description: 'Lightning-fast response times with streaming capabilities and instant feedback.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Shield,
    title: 'Premium Interface',
    description: 'Sophisticated user experience with glassmorphism design and fluid animations.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
];

export const FeatureCards: React.FC = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-white">
            Cutting-Edge
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Features</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Experience the next generation of AI interaction with our premium feature set
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="glass-ultra border border-white/10 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-500 hover:scale-105 relative overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 glass-premium border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 glow-subtle group-hover:glow-primary transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer-premium opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
