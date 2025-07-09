
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { ChevronLeft, Brain, Menu } from 'lucide-react';

export const SidebarHeader: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useChatStore();
  const isMobile = useIsMobile();

  return (
    <div className="p-4 h-16 border-b border-violet-900/60 flex items-center justify-between">
      {(sidebarOpen || !isMobile) && (
        <div className={cn("flex items-center gap-3", !sidebarOpen && !isMobile && "hidden")}>
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">Assistant</span>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="h-8 w-8 p-1.5 hover:bg-violet-900/50 rounded-lg transition-colors text-gray-400 hover:text-white flex-shrink-0"
      >
        {isMobile ? (
          <Menu className="h-5 w-5" />
        ) : (
          <ChevronLeft className={cn("h-5 w-5 transition-transform", !sidebarOpen && "rotate-180")} />
        )}
      </Button>
    </div>
  );
};
