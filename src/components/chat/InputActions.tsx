
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff, Paperclip, Square } from 'lucide-react';
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
    <>
      {/* Attachment Button */}
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 h-10 w-10 text-white/40 hover:text-white/60 hover:bg-white/5 transition-all duration-200 rounded-xl"
        disabled={disabled}
      >
        <Paperclip className="h-4 w-4" />
      </Button>

      {/* Voice Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleRecording}
        disabled={disabled}
        className={cn(
          "shrink-0 h-10 w-10 transition-all duration-300 rounded-xl premium-button",
          isRecording
            ? "text-red-400 hover:text-red-300 glow-primary"
            : "text-white/40 hover:text-white/60 hover:bg-white/5"
        )}
      >
        {isRecording ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>

      {/* Send/Stop Button */}
      <Button
        onClick={isTyping ? () => {} : handleSubmit}
        disabled={(!input.trim() && !isTyping) || disabled}
        size="icon"
        className={cn(
          "shrink-0 h-10 w-10 rounded-xl transition-all duration-300 premium-button",
          isTyping
            ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
            : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          !disabled && (input.trim() || isTyping) && "glow-subtle shadow-lg"
        )}
      >
        {isTyping ? (
          <Square className="h-4 w-4 text-white/80" />
        ) : (
          <Send className="h-4 w-4 text-white/80" />
        )}
      </Button>
    </>
  );
};
