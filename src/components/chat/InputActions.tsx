
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff, Paperclip, Square, Plus } from 'lucide-react';
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
      {/* Attachment Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "shrink-0 h-11 w-11 rounded-xl transition-all duration-300",
          "text-white/50 hover:text-white/80",
          "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-violet-500/10",
          "hover:border-purple-500/20 border border-transparent",
          "hover:shadow-lg hover:shadow-purple-500/10"
        )}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>

      {/* Voice Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleRecording}
        disabled={disabled}
        className={cn(
          "shrink-0 h-11 w-11 rounded-xl transition-all duration-300",
          "border border-transparent",
          isRecording ? [
            "text-red-400 hover:text-red-300",
            "bg-gradient-to-r from-red-500/15 to-red-600/10",
            "border-red-500/25",
            "shadow-lg shadow-red-500/20",
            "animate-pulse"
          ] : [
            "text-white/50 hover:text-white/80",
            "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-violet-500/10",
            "hover:border-purple-500/20",
            "hover:shadow-lg hover:shadow-purple-500/10"
          ]
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
          "shrink-0 h-11 w-11 rounded-xl transition-all duration-300",
          "border border-transparent",
          "relative overflow-hidden group",
          isTyping ? [
            "bg-gradient-to-r from-red-500/20 to-red-600/15",
            "border-red-500/30 text-red-300",
            "hover:from-red-500/30 hover:to-red-600/25",
            "shadow-lg shadow-red-500/20"
          ] : [
            "bg-gradient-to-r from-purple-500/20 to-violet-500/15",
            "border-purple-500/30 text-purple-200",
            "hover:from-purple-500/30 hover:to-violet-500/25",
            "hover:border-purple-400/40",
            "shadow-lg shadow-purple-500/20",
            !disabled && (input.trim() || isTyping) && [
              "shadow-xl shadow-purple-500/30",
              "hover:shadow-2xl hover:shadow-purple-500/40"
            ]
          ],
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        )}
      >
        {/* Button background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-violet-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isTyping ? (
          <Square className="h-4 w-4 relative z-10" />
        ) : (
          <Send className="h-4 w-4 relative z-10" />
        )}
      </Button>
    </div>
  );
};
