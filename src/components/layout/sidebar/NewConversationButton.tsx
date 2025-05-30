
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
          "w-full relative bg-black hover:bg-gray-900 text-white border-2 border-transparent transition-all duration-300",
          "before:absolute before:inset-0 before:rounded-md before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:via-violet-500 before:to-purple-600",
          "before:-z-10 before:opacity-60 hover:before:opacity-100 before:transition-opacity before:duration-300",
          "shadow-lg hover:shadow-xl hover:shadow-purple-500/25",
          (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
        )}
      >
        <Plus className="h-4 w-4 flex-shrink-0" />
        {(sidebarOpen || isMobile) && <span className="font-medium">New Chat</span>}
      </Button>
    </div>
  );
};
