
import React from 'react';
import { useAgentStore } from '@/store/agentStore';
import { Circle, Target, Leaf, BarChart3, Lightbulb, TrendingUp, RotateCcw, Zap, Users } from 'lucide-react';

const iconMap = {
  Circle,
  Target,
  Leaf,
  BarChart3,
  Lightbulb,
  TrendingUp,
  RotateCcw,
  Zap,
  Users
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const WelcomeState: React.FC = () => {
  const { getActiveAgent } = useAgentStore();
  const activeAgent = getActiveAgent();
  
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Circle;
    return IconComponent;
  };

  if (!activeAgent) {
    return (
      <div className="flex items-center justify-center min-h-full py-12">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            {getGreeting()}.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-2">
            How can I help you today?
          </p>
        </div>
      </div>
    );
  }

  const Icon = getIcon(activeAgent.icon);

  return (
    <div className="flex items-center justify-center min-h-full py-12">
      <div className="text-center space-y-8 p-8 max-w-2xl mx-auto">
        {/* Agent avatar with dynamic color */}
        <div className="relative mx-auto w-20 h-20">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${activeAgent.color} opacity-20 animate-pulse`}></div>
          <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${activeAgent.color} backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            {getGreeting()}.
          </h1>
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-medium text-white">
              I'm {activeAgent.name}
            </h2>
            <p className="text-lg text-gray-300">
              {activeAgent.description}
            </p>
            <p className="text-base text-gray-400">
              Specialized in {activeAgent.specialty}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        {activeAgent.actions && activeAgent.actions.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Quick actions to get started:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
              {activeAgent.actions.slice(0, 4).map((action) => (
                <button
                  key={action.id}
                  className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors text-left"
                  onClick={() => {
                    // Trigger the action
                    const textarea = document.querySelector('textarea');
                    if (textarea) {
                      textarea.value = action.label;
                      textarea.focus();
                    }
                  }}
                >
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
