
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
    <div className="border-t border-violet-800 p-4">
      <div className="flex w-full items-center justify-between rounded-md p-2 text-sm text-neutral-300 hover:bg-violet-800/50 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-violet-900 flex items-center justify-center text-sm font-semibold text-violet-300">
            JD
          </div>
          {(sidebarOpen || isMobile) && (
            <div className="min-w-0">
              <span className="font-medium text-white">John Doe</span>
              {activeAgent?.id === 'biometrics-engine' && (
                <div className={`text-xs ${showBiometrics ? 'text-purple-400' : 'text-white/60'}`}>
                  Biometrics {showBiometrics ? 'Active' : 'Available'}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {activeAgent?.id === 'biometrics-engine' && (sidebarOpen || isMobile) && (
            <Button
              onClick={() => setShowBiometrics(!showBiometrics)}
              variant="ghost"
              size="icon"
              className={`h-4 w-4 rounded transition-colors ${
                showBiometrics 
                  ? "text-purple-400" 
                  : "text-neutral-400 hover:text-white"
              }`}
              title={showBiometrics ? 'Hide Biometrics' : 'Show Biometrics'}
            >
              <Activity className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-neutral-400 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
