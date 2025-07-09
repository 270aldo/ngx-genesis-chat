
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
          {(sidebarOpen || isMobile) && (
            <div className="min-w-0">
              <span className="text-sm font-medium text-white block">John Doe</span>
              {activeAgent?.id === 'biometrics-engine' && (
                <span className={`text-xs ${showBiometrics ? 'text-purple-400' : 'text-white/60'}`}>
                  Biometrics {showBiometrics ? 'Active' : 'Available'}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {activeAgent?.id === 'biometrics-engine' && (sidebarOpen || isMobile) && (
            <Button
              onClick={() => setShowBiometrics(!showBiometrics)}
              variant="ghost"
              size="icon"
              className={`p-2 rounded-lg transition-colors ${
                showBiometrics 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "hover:bg-violet-900/50 text-gray-400 hover:text-white"
              }`}
              title={showBiometrics ? 'Hide Biometrics' : 'Show Biometrics'}
            >
              <Activity className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-violet-900/50 rounded-lg transition-colors text-gray-400 hover:text-white"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
