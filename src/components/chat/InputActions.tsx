
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, Plus, Phone } from 'lucide-react';
import { useVoiceConversation } from '@/hooks/useVoiceConversation';
import { VoiceInterface } from '../voice/VoiceInterface';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface InputActionsProps {
  disabled?: boolean;
  isRecording: boolean;
  toggleRecording: () => void;
  isTyping: boolean;
  input: string;
  handleSubmit: () => void;
}

export const InputActions: React.FC<InputActionsProps> = ({
  disabled,
  isRecording,
  toggleRecording,
  isTyping,
  input,
  handleSubmit
}) => {
  const [showVoiceDialog, setShowVoiceDialog] = useState(false);
  const { isVoiceActive } = useVoiceConversation();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>

      <Dialog open={showVoiceDialog} onOpenChange={setShowVoiceDialog}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              isVoiceActive 
                ? 'text-purple-400 bg-purple-500/20 hover:bg-purple-500/30' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            disabled={disabled}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black/90 border-purple-500/20">
          <VoiceInterface />
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleRecording}
        disabled={disabled}
        className={`h-8 w-8 ${isRecording ? 'text-red-400 bg-red-500/20' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
      >
        <Mic className="h-4 w-4" />
      </Button>

      <Button
        onClick={handleSubmit}
        disabled={(!input.trim() && !isTyping) || disabled}
        size="icon"
        className="h-8 w-8 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
