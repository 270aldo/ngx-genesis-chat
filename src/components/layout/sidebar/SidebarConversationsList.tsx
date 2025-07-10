
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 border border-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        />
      </div>
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
                    "group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium cursor-pointer transition-all",
                    conversation.id === currentConversationId 
                      ? "text-white bg-violet-800/50" 
                      : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                  )}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <span className="flex items-center gap-3 truncate">
                    <MessageSquare className="h-4 w-4 text-violet-400" />
                    {(sidebarOpen || isMobile) && (
                      <span className="truncate">{conversation.title}</span>
                    )}
                  </span>
                  {(sidebarOpen || isMobile) && (
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
                  )}
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
                  "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all",
                  isActiveRoute('/quick-actions')
                    ? "text-white bg-violet-800/50"
                    : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                )}
              >
                <Zap className="h-4 w-4 text-violet-400" />
                {(sidebarOpen || isMobile) && <span>Quick Actions</span>}
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
                  "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all",
                  isActiveRoute('/dashboard/training')
                    ? "text-white bg-violet-800/50"
                    : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                )}
              >
                <BookOpen className="h-4 w-4 text-violet-400" />
                {(sidebarOpen || isMobile) && <span>My Programs</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/progress" 
                onClick={() => isMobile && toggleSidebar()}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all",
                  isActiveRoute('/dashboard/progress')
                    ? "text-white bg-violet-800/50"
                    : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                )}
              >
                <TrendingUp className="h-4 w-4 text-violet-400" />
                {(sidebarOpen || isMobile) && <span>Progress</span>}
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
                  "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all",
                  isActiveRoute('/dashboard/nutrition')
                    ? "text-white bg-violet-800/50"
                    : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                )}
              >
                <Apple className="h-4 w-4 text-violet-400" />
                {(sidebarOpen || isMobile) && <span>Meal Plans</span>}
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
                  "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all",
                  isActiveRoute('/dashboard')
                    ? "text-white bg-violet-800/50"
                    : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                )}
              >
                <LayoutDashboard className="h-4 w-4 text-violet-400" />
                {(sidebarOpen || isMobile) && <span>Overview</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                onClick={() => isMobile && toggleSidebar()}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-all",
                  isActiveRoute('/settings')
                    ? "text-white bg-violet-800/50"
                    : "text-neutral-300 hover:bg-violet-900/30 hover:text-white"
                )}
              >
                <Settings className="h-4 w-4 text-violet-400" />
                {(sidebarOpen || isMobile) && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
