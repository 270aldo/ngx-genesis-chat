
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { MessageSquare, Trash2, BookOpen, TrendingUp, Apple, LayoutDashboard, Settings, Zap, ChevronDown, ChevronUp } from 'lucide-react';

export const SidebarConversationsList: React.FC = () => {
  const {
    conversations,
    currentConversationId,
    sidebarOpen,
    setCurrentConversation,
    deleteConversation,
    toggleSidebar,
  } = useChatStore();
  
  const [conversationsExpanded, setConversationsExpanded] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();

  const COLLAPSED_LIMIT = 3;
  const displayedConversations = conversationsExpanded 
    ? conversations 
    : conversations.slice(0, COLLAPSED_LIMIT);

  const isActiveRoute = (path: string) => location.pathname === path;

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    // Auto-close sidebar on mobile after selecting conversation
    if (isMobile) {
      toggleSidebar();
    }
  };

  const CollapsedNavItem = ({ icon: Icon, tooltip, to, onClick }: {
    icon: any;
    tooltip: string;
    to?: string;
    onClick?: () => void;
  }) => {
    const content = (
      <div
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-md transition-all duration-200 cursor-pointer mx-auto mb-3",
          to && isActiveRoute(to)
            ? "bg-violet-800/50 text-white"
            : "text-violet-400 hover:bg-violet-900/30 hover:text-white"
        )}
        onClick={onClick}
      >
        <Icon className="h-4 w-4" />
      </div>
    );

    if (to) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={to} onClick={() => isMobile && toggleSidebar()}>
              {content}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <div className={cn("flex-1 overflow-y-auto transition-all duration-200", sidebarOpen || isMobile ? "p-4" : "p-2")}>
        {/* Search - only show when expanded */}
        {(sidebarOpen || isMobile) && (
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 border border-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
          </div>
        )}

        {/* Collapsed view - only icons */}
        {!sidebarOpen && !isMobile && (
          <nav className="space-y-2">
            {/* Only show first conversation as icon */}
            {conversations.length > 0 && (
              <CollapsedNavItem
                icon={MessageSquare}
                tooltip={conversations[0]?.title || "Conversations"}
                onClick={() => handleSelectConversation(conversations[0].id)}
              />
            )}
            <CollapsedNavItem icon={Zap} tooltip="Quick Actions" to="/quick-actions" />
            <CollapsedNavItem icon={BookOpen} tooltip="My Programs" to="/dashboard/training" />
            <CollapsedNavItem icon={TrendingUp} tooltip="Progress" to="/dashboard/progress" />
            <CollapsedNavItem icon={Apple} tooltip="Meal Plans" to="/dashboard/nutrition" />
            <CollapsedNavItem icon={LayoutDashboard} tooltip="Overview" to="/dashboard" />
            <CollapsedNavItem icon={Settings} tooltip="Settings" to="/settings" />
          </nav>
        )}

        {/* Expanded view - full content */}
        {(sidebarOpen || isMobile) && (
          <nav className="space-y-6">
            {/* Conversations */}
            <div>
              <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-300">Conversations</h3>
                {conversations.length > COLLAPSED_LIMIT && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setConversationsExpanded(!conversationsExpanded)}
                    className="h-4 w-4 text-violet-400 hover:text-violet-300"
                  >
                    {conversationsExpanded ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>
              <ul className="space-y-1">
                {displayedConversations.map((conversation) => (
                  <li key={conversation.id}>
                    <div
                      className={cn(
                        "group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium cursor-pointer transition-all duration-200",
                        conversation.id === currentConversationId 
                          ? "text-white bg-violet-800/50" 
                          : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                      )}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      <span className="flex items-center gap-3 truncate">
                        <MessageSquare className="h-4 w-4 text-violet-400 flex-shrink-0" />
                        <span className="truncate">{conversation.title}</span>
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conversation.id);
                        }}
                        className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Quick Actions</h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/quick-actions" 
                    onClick={() => isMobile && toggleSidebar()}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                      isActiveRoute('/quick-actions')
                        ? "text-white bg-violet-800/50"
                        : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                    )}
                  >
                    <Zap className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span>Quick Actions</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Training Programs */}
            <div>
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Training</h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/dashboard/training" 
                    onClick={() => isMobile && toggleSidebar()}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                      isActiveRoute('/dashboard/training')
                        ? "text-white bg-violet-800/50"
                        : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                    )}
                  >
                    <BookOpen className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span>My Programs</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard/progress" 
                    onClick={() => isMobile && toggleSidebar()}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                      isActiveRoute('/dashboard/progress')
                        ? "text-white bg-violet-800/50"
                        : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                    )}
                  >
                    <TrendingUp className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span>Progress</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nutrition */}
            <div>
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Nutrition</h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/dashboard/nutrition" 
                    onClick={() => isMobile && toggleSidebar()}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                      isActiveRoute('/dashboard/nutrition')
                        ? "text-white bg-violet-800/50"
                        : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                    )}
                  >
                    <Apple className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span>Meal Plans</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Dashboards */}
            <div>
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Dashboards</h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/dashboard" 
                    onClick={() => isMobile && toggleSidebar()}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                      isActiveRoute('/dashboard')
                        ? "text-white bg-violet-800/50"
                        : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span>Overview</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/settings" 
                    onClick={() => isMobile && toggleSidebar()}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                      isActiveRoute('/settings')
                        ? "text-white bg-violet-800/50"
                        : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                    )}
                  >
                    <Settings className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    </TooltipProvider>
  );
};
