
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAgentStore } from '@/store/agentStore';
import { cn } from '@/lib/utils';
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

export const AgentSelector: React.FC = () => {
  const { agents, activeAgentId, setActiveAgent, getActiveAgent } = useAgentStore();
  const activeAgent = getActiveAgent();

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Circle;
    return IconComponent;
  };

  return (
    <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          {activeAgent && (
            <>
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                `bg-gradient-to-br ${activeAgent.color}`
              )}>
                <span className="text-lg">{activeAgent.avatar}</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">{activeAgent.name}</h3>
                <p className="text-xs text-white/60">{activeAgent.specialty}</p>
              </div>
            </>
          )}
        </div>
        
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {agents.map((agent) => {
              const Icon = getIcon(agent.icon);
              const isActive = agent.id === activeAgentId;
              
              return (
                <Button
                  key={agent.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveAgent(agent.id)}
                  className={cn(
                    "flex-shrink-0 h-12 px-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? `bg-gradient-to-br ${agent.color} text-white shadow-lg` 
                      : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base">{agent.avatar}</span>
                    <span className="text-xs font-medium leading-none">{agent.name.split(' ')[0]}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
