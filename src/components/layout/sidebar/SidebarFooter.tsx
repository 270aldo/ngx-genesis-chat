
import React from 'react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { Settings } from 'lucide-react';

interface SidebarFooterProps {
  showBiometrics: boolean;
  setShowBiometrics: (show: boolean) => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = () => {
  const { sidebarOpen } = useChatStore();
  const isMobile = useIsMobile();

  return (
    <div className="p-4 border-t border-violet-900/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-900/50 text-sm font-semibold text-violet-300">
            JD
          </div>
          {(sidebarOpen || isMobile) && <span className="text-sm font-medium text-white">John Doe</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="p-2 hover:bg-violet-900/50 rounded-lg transition-colors text-gray-400 hover:text-white"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
