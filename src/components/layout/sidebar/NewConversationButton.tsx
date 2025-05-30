
import React from 'react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

export const NewConversationButton: React.FC = () => {
  const { sidebarOpen, createConversation, toggleSidebar } = useChatStore();
  const isMobile = useIsMobile();

  const handleNewConversation = () => {
    createConversation();
    // Auto-close sidebar on mobile after creating conversation
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div className="p-3">
      <Button
        onClick={handleNewConversation}
        className={cn(
          "w-full bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground",
          (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
        )}
      >
        <Plus className="h-4 w-4 flex-shrink-0" />
        {(sidebarOpen || isMobile) && <span>New Chat</span>}
      </Button>
    </div>
  );
};
