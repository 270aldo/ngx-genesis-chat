
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <ScrollArea className="flex-1 p-4">
      <div>
        <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent</h3>
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all",
                "hover:bg-violet-900/50 hover:text-white",
                conversation.id === currentConversationId 
                  ? "bg-violet-900/50 text-white" 
                  : "text-gray-300"
              )}
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              {(sidebarOpen || isMobile) && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {conversation.title}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 flex-shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
