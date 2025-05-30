
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff, Plus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <div className="flex items-center gap-2">
      {/* Clean Attachment Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-10 w-10 rounded-lg",
          "text-white/50 hover:text-white/80",
          "hover:bg-purple-500/20",
          "transition-all duration-200"
        )}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>

      {/* Clean Voice Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleRecording}
        disabled={disabled}
        className={cn(
          "h-10 w-10 rounded-lg",
          "transition-all duration-200",
          isRecording ? [
            "text-red-400 bg-red-500/20",
            "hover:bg-red-500/30"
          ] : [
            "text-white/50 hover:text-white/80",
            "hover:bg-purple-500/20"
          ]
        )}
      >
        {isRecording ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>

      {/* Clean Send/Stop Button */}
      <Button
        onClick={isTyping ? () => {} : handleSubmit}
        disabled={(!input.trim() && !isTyping) || disabled}
        size="icon"
        className={cn(
          "h-10 w-10 rounded-lg",
          "transition-all duration-200",
          isTyping ? [
            "bg-red-500/30 text-red-300",
            "hover:bg-red-500/40"
          ] : [
            "bg-purple-500/30 text-purple-200",
            "hover:bg-purple-500/40",
            !disabled && input.trim() && "bg-purple-500/50"
          ],
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isTyping ? (
          <Square className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
