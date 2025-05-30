
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAgentStore } from '@/store/agentStore';
import { useAgentNavigation } from '@/hooks/useAgentNavigation';
import { cn } from '@/lib/utils';
import { Circle, Target, Leaf, BarChart3, Lightbulb, TrendingUp, RotateCcw, Zap, Users, ChevronDown } from 'lucide-react';

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
  const { agents, activeAgentId, getActiveAgent } = useAgentStore();
  const { navigateToAgent } = useAgentNavigation();
  const activeAgent = getActiveAgent();
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Scroll chat area up when expanded
  React.useEffect(() => {
    if (isExpanded) {
      const chatArea = document.querySelector('.chat-scroll-area');
      if (chatArea) {
        chatArea.scrollBy({
          top: -200,
          behavior: 'smooth'
        });
      }
    }
  }, [isExpanded]);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Circle;
    return IconComponent;
  };

  return (
    <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="px-4 py-3">
        {/* Active Agent Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {activeAgent && (
              <>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
                  `bg-gradient-to-br ${activeAgent.color}`
                )}>
                  {React.createElement(getIcon(activeAgent.icon), { className: "w-5 h-5" })}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white truncate">{activeAgent.name}</h3>
                  <p className="text-xs text-white/70 truncate">{activeAgent.specialty}</p>
                  {activeAgent.actions && (
                    <p className="text-xs text-white/50 mt-1">
                      {activeAgent.actions.length} actions available
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/60 hover:text-white hover:bg-white/10 p-2"
          >
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-300",
              isExpanded && "rotate-180"
            )} />
          </Button>
        </div>
        
        {/* Agent Grid */}
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-96 opacity-100" : "max-h-20 opacity-100"
        )}>
          <div className="w-full">
            <div className={cn(
              "grid gap-2 pb-2",
              isExpanded ? "grid-cols-2 sm:grid-cols-3" : "flex overflow-x-auto"
            )}>
              {agents.map((agent) => {
                const Icon = getIcon(agent.icon);
                const isActive = agent.id === activeAgentId;
                
                return (
                  <Button
                    key={agent.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToAgent(agent.id)}
                    className={cn(
                      "transition-all duration-200 rounded-xl",
                      isExpanded 
                        ? "h-20 p-3 flex-col justify-center items-center gap-2" 
                        : "flex-shrink-0 h-16 px-3 flex-col justify-center items-center gap-1",
                      isActive 
                        ? `bg-gradient-to-br ${agent.color} text-white shadow-lg border border-white/20` 
                        : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-transparent hover:border-white/10"
                    )}
                  >
                    {isExpanded ? (
                      <>
                        <div className="flex items-center gap-2 w-full">
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-sm font-medium truncate">{agent.title}</p>
                            <p className="text-xs opacity-80 truncate">{agent.name.split(' ')[0]} {agent.name.split(' ')[1]}</p>
                          </div>
                        </div>
                        {agent.actions && (
                          <div className="w-full">
                            <div className="flex flex-wrap gap-1 mt-1">
                              {agent.actions.slice(0, 2).map((action) => (
                                <span
                                  key={action.id}
                                  className="text-xs px-1.5 py-0.5 rounded bg-white/10 truncate"
                                >
                                  {action.label}
                                </span>
                              ))}
                              {agent.actions.length > 2 && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-white/10">
                                  +{agent.actions.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium leading-none truncate">
                          {agent.title}
                        </span>
                        {agent.actions && (
                          <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60 mt-0.5" />
                        )}
                      </>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Capabilities Preview - Only show when expanded and agent has actions */}
        {isExpanded && activeAgent?.actions && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/60 mb-2">Available Actions</p>
            <div className="flex flex-wrap gap-1.5">
              {activeAgent.actions.slice(0, 4).map((action) => (
                <span
                  key={action.id}
                  className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/80 border border-white/10"
                >
                  {action.label}
                </span>
              ))}
              {activeAgent.actions.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/60">
                  +{activeAgent.actions.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
