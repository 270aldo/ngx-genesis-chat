
import React, { useState } from 'react';
import { AgentSelector } from '../agents/AgentSelector';
import { QuickActionsButton } from '../chat/QuickActionsButton';
import { ExportOptions } from '../chat/ExportOptions';
import { VoiceInterface } from '../voice/VoiceInterface';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useVoiceConversation } from '@/hooks/useVoiceConversation';

interface ChatHeaderProps {
  showBiometrics: boolean;
  setShowBiometrics: (show: boolean) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  showBiometrics, 
  setShowBiometrics 
}) => {
  const [showVoiceDialog, setShowVoiceDialog] = useState(false);
  const { isVoiceActive } = useVoiceConversation();

  return (
    <div className="relative z-10 border-b border-white/5">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex-1 min-w-0">
          <AgentSelector />
        </div>
        <div className="ml-4 flex-shrink-0 flex items-center gap-3">
          <Dialog open={showVoiceDialog} onOpenChange={setShowVoiceDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  isVoiceActive 
                    ? 'text-purple-400 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                } transition-all duration-300`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Voice Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-black/90 border-purple-500/20">
              <VoiceInterface />
            </DialogContent>
          </Dialog>
          <QuickActionsButton />
          <ExportOptions />
        </div>
      </div>
    </div>
  );
};
