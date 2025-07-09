
import React from 'react';
import { AgentSelector } from '../agents/AgentSelector';
import { BiometricsToggle } from './BiometricsToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  showBiometrics: boolean;
  setShowBiometrics: (show: boolean) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ showBiometrics, setShowBiometrics }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative z-10 border-b border-violet-900/60 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={cn(
        "flex items-center justify-between h-16",
        isMobile ? "px-3" : "px-4 md:px-6"
      )}>
        <div className="flex-1 min-w-0">
          <AgentSelector />
        </div>
        
        <div className="flex items-center gap-3">
          {setShowBiometrics && (
            <BiometricsToggle 
              showBiometrics={showBiometrics}
              setShowBiometrics={setShowBiometrics}
            />
          )}
        </div>
      </div>
    </div>
  );
};
