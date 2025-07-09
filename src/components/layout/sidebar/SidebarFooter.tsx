
import React from 'react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAgentStore } from '@/store/agentStore';
import { Settings, Activity } from 'lucide-react';

interface SidebarFooterProps {
  showBiometrics: boolean;
  setShowBiometrics: (show: boolean) => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ showBiometrics, setShowBiometrics }) => {
  const { sidebarOpen } = useChatStore();
  const { getActiveAgent } = useAgentStore();
  const isMobile = useIsMobile();
  const activeAgent = getActiveAgent();

  return (
    <div className="p-4 border-t border-violet-900/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-900/50 text-sm font-semibold text-violet-300">
            JD
          </div>
          {(sidebarOpen || isMobile) && <span className="text-sm font-medium text-white">John Doe</span>}
        </div>
        <div className="flex items-center gap-2">
          {activeAgent?.id === 'biometrics-engine' && (
            <Button
              onClick={() => setShowBiometrics(!showBiometrics)}
              variant="ghost"
              size="icon"
              className={`p-2 rounded-lg transition-colors ${
                showBiometrics 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "hover:bg-violet-900/50 text-gray-400 hover:text-white"
              }`}
            >
              <Activity className="w-5 h-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-violet-900/50 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
