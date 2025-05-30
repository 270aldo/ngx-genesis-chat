
import React from 'react';
import { AgentSelector } from '../agents/AgentSelector';
import { QuickActionsButton } from '../chat/QuickActionsButton';
import { ExportOptions } from '../chat/ExportOptions';

interface ChatHeaderProps {
  showBiometrics: boolean;
  setShowBiometrics: (show: boolean) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  showBiometrics, 
  setShowBiometrics 
}) => {
  return (
    <div className="relative z-10 border-b border-white/5">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex-1 min-w-0">
          <AgentSelector />
        </div>
        <div className="ml-4 flex-shrink-0 flex items-center gap-3">
          {!showBiometrics && (
            <>
              <QuickActionsButton />
              <ExportOptions />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
