
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
          className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        />
      </div>
      <nav className="space-y-4">
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">History</h3>
          <ul className="space-y-1">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <div
                  className={cn(
                    "group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium cursor-pointer transition-all",
                    conversation.id === currentConversationId 
                      ? "text-white bg-neutral-800" 
                      : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  )}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <span className="flex items-center gap-3 truncate">
                    <MessageSquare className="h-4 w-4 text-neutral-400" />
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
      </nav>
    </div>
  );
};
