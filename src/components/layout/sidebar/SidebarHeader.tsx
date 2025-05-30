
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
    <div className="p-4 border-b border-sidebar-border">
      <div className="flex items-center justify-between">
        {(sidebarOpen || !isMobile) && (
          <div className={cn("flex items-center gap-3", !sidebarOpen && !isMobile && "hidden")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-navy-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">NGX Agents</h1>
              <p className="text-xs text-sidebar-foreground/60">Advanced AI Interface</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground flex-shrink-0"
        >
          {isMobile ? (
            <Menu className="h-4 w-4" />
          ) : (
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          )}
        </Button>
      </div>
    </div>
  );
};
