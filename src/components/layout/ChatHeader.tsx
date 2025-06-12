
import React from 'react';
import { AgentSelector } from '../agents/AgentSelector';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  showBiometrics: boolean;
  setShowBiometrics?: (show: boolean) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  showBiometrics
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className={cn(
        "flex items-center justify-between py-3",
        isMobile ? "px-3" : "px-4 sm:px-6"
      )}>
        <div className="flex-1 min-w-0">
          <AgentSelector />
        </div>
      </div>
    </div>
  );
};
