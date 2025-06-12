import React from 'react';
import { Button } from '@/components/ui/button';
import { useAgentStore } from '@/store/agentStore';
import { useAgentNavigation } from '@/hooks/useAgentNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();
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
      <div className={cn("px-4 py-3", isMobile && "px-3 py-2")}>
        {/* Active Agent Header - Optimized for mobile */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {activeAgent && (
              <>
                <div className={cn(
                  "rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0",
                  `bg-gradient-to-br ${activeAgent.color}`,
                  isMobile ? "w-8 h-8" : "w-10 h-10"
                )}>
                  {React.createElement(getIcon(activeAgent.icon), { 
                    className: isMobile ? "w-4 h-4" : "w-5 h-5" 
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "font-semibold text-white truncate",
                    isMobile ? "text-sm" : "text-base"
                  )}>
                    {activeAgent.name}
                  </h3>
                  <p className={cn(
                    "text-white/70 truncate",
                    isMobile ? "text-xs" : "text-xs"
                  )}>
                    {activeAgent.specialty}
                  </p>
                  {activeAgent.actions && !isMobile && (
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
            className={cn(
              "text-white/60 hover:text-white hover:bg-white/10",
              isMobile ? "p-1.5" : "p-2"
            )}
          >
            <ChevronDown className={cn(
              "transition-transform duration-300",
              isExpanded && "rotate-180",
              isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
            )} />
          </Button>
        </div>
        
        {/* Agent Grid - Optimized for mobile */}
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-96 opacity-100" : (isMobile ? "max-h-16" : "max-h-20") + " opacity-100"
        )}>
          <div className="w-full">
            <div className={cn(
              "gap-2 pb-2",
              isExpanded ? (
                isMobile ? "grid grid-cols-2" : "grid grid-cols-3"
              ) : "flex overflow-x-auto scrollbar-hide"
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
                      isExpanded ? (
                        isMobile 
                          ? "h-16 p-2 flex-col justify-center items-center gap-1" 
                          : "h-20 p-3 flex-col justify-center items-center gap-2"
                      ) : (
                        isMobile
                          ? "flex-shrink-0 h-12 px-2 flex-col justify-center items-center gap-0.5"
                          : "flex-shrink-0 h-16 px-3 flex-col justify-center items-center gap-1"
                      ),
                      isActive 
                        ? `bg-gradient-to-br ${agent.color} text-white shadow-lg border border-white/20` 
                        : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-transparent hover:border-white/10"
                    )}
                  >
                    {isExpanded ? (
                      <>
                        <div className="flex items-center gap-2 w-full">
                          <Icon className={cn("flex-shrink-0", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
                          <div className="flex-1 min-w-0 text-left">
                            <p className={cn("font-medium truncate", isMobile ? "text-xs" : "text-sm")}>
                              {agent.title}
                            </p>
                            <p className={cn("opacity-80 truncate", isMobile ? "text-xs" : "text-xs")}>
                              {agent.name.split(' ')[0]} {agent.name.split(' ')[1]}
                            </p>
                          </div>
                        </div>
                        {agent.actions && (
                          <div className="w-full">
                            <div className="flex flex-wrap gap-1 mt-1">
                              {agent.actions.slice(0, isMobile ? 1 : 2).map((action) => (
                                <span
                                  key={action.id}
                                  className={cn(
                                    "px-1.5 py-0.5 rounded bg-white/10 truncate",
                                    isMobile ? "text-xs" : "text-xs"
                                  )}
                                >
                                  {action.label}
                                </span>
                              ))}
                              {agent.actions.length > (isMobile ? 1 : 2) && (
                                <span className={cn(
                                  "px-1.5 py-0.5 rounded bg-white/10",
                                  isMobile ? "text-xs" : "text-xs"
                                )}>
                                  +{agent.actions.length - (isMobile ? 1 : 2)}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Icon className={cn(isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
                        <span className={cn(
                          "font-medium leading-none truncate text-center",
                          isMobile ? "text-xs" : "text-xs"
                        )}>
                          {agent.title}
                        </span>
                      </>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Capabilities Preview - Only show when expanded and agent has actions */}
        {isExpanded && activeAgent?.actions && !isMobile && (
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
