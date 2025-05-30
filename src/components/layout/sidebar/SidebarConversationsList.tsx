
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
    <ScrollArea className="flex-1 px-3">
      <div className="space-y-1">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
              "hover:bg-sidebar-accent",
              conversation.id === currentConversationId && "bg-sidebar-accent"
            )}
            onClick={() => handleSelectConversation(conversation.id)}
          >
            <MessageSquare className="h-4 w-4 flex-shrink-0 text-sidebar-foreground/60" />
            {(sidebarOpen || isMobile) && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate text-sidebar-foreground">
                    {conversation.title}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60">
                    {conversation.messages.length} messages
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conversation.id);
                  }}
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-sidebar-foreground/60 hover:text-red-400 flex-shrink-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
