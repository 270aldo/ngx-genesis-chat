
import React from 'react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { MessageSquare, Trash2 } from 'lucide-react';

export const SidebarConversationsList: React.FC = () => {
  const {
    conversations,
    currentConversationId,
    sidebarOpen,
    setCurrentConversation,
    deleteConversation,
    toggleSidebar,
  } = useChatStore();
  
  const isMobile = useIsMobile();

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
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Conversations</h3>
          <ul className="space-y-1">
            {conversations.map((conversation) => (
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

        {/* Training Programs */}
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Training</h3>
          <ul className="space-y-1">
            <li>
              <a href="/training" className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-300 hover:bg-violet-900/30 hover:text-white transition-all">
                <svg className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {(sidebarOpen || isMobile) && <span>My Programs</span>}
              </a>
            </li>
            <li>
              <a href="/progress" className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-300 hover:bg-violet-900/30 hover:text-white transition-all">
                <svg className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {(sidebarOpen || isMobile) && <span>Progress</span>}
              </a>
            </li>
          </ul>
        </div>

        {/* Nutrition */}
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Nutrition</h3>
          <ul className="space-y-1">
            <li>
              <a href="/nutrition" className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-300 hover:bg-violet-900/30 hover:text-white transition-all">
                <svg className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-3m-3 3l-3-3" />
                </svg>
                {(sidebarOpen || isMobile) && <span>Meal Plans</span>}
              </a>
            </li>
          </ul>
        </div>

        {/* Dashboards */}
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Dashboards</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-300 hover:bg-violet-900/30 hover:text-white transition-all">
                <svg className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                {(sidebarOpen || isMobile) && <span>Overview</span>}
              </a>
            </li>
            <li>
              <a href="/settings" className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-300 hover:bg-violet-900/30 hover:text-white transition-all">
                <svg className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {(sidebarOpen || isMobile) && <span>Settings</span>}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
