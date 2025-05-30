
import React from 'react';
import { Button } from '@/components/ui/button';
import { StarBorder } from '@/components/ui/star-border';
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
      <StarBorder className="w-full">
        <Button
          onClick={handleNewConversation}
          className={cn(
            "w-full bg-black hover:bg-gray-900 text-white border-0 rounded-lg",
            (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
          )}
        >
          <Plus className="h-4 w-4 flex-shrink-0" />
          {(sidebarOpen || isMobile) && <span className="font-medium">New Chat</span>}
        </Button>
      </StarBorder>
    </div>
  );
};
