
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff, Paperclip, Square } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isVoiceMode, setVoiceMode, isTyping } = useChatStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setVoiceMode(!isVoiceMode);
  };

  return (
    <div className="border-t border-border/50 bg-background/80 backdrop-blur-md p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative glass rounded-2xl border border-border/50 overflow-hidden">
          {/* Input Area */}
          <div className="flex items-end gap-2 p-4">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-10 w-10 text-muted-foreground hover:text-foreground transition-colors"
              disabled={disabled}
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isTyping ? "NGX Agent is thinking..." : "Type your message..."}
                disabled={disabled || isTyping}
                className={cn(
                  "min-h-[44px] max-h-[120px] resize-none border-0 bg-transparent",
                  "focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-2",
                  "placeholder:text-muted-foreground/60"
                )}
                rows={1}
              />
              
              {/* Typing Indicator Overlay */}
              {isTyping && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex gap-1">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                    <span>NGX Agent is responding...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Voice Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRecording}
              disabled={disabled}
              className={cn(
                "shrink-0 h-10 w-10 transition-all duration-200",
                isRecording
                  ? "text-red-400 hover:text-red-300 animate-pulse-glow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isRecording ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            {/* Send/Stop Button */}
            <Button
              onClick={isTyping ? () => {} : handleSubmit}
              disabled={(!input.trim() && !isTyping) || disabled}
              size="icon"
              className={cn(
                "shrink-0 h-10 w-10 rounded-xl transition-all duration-200",
                isTyping
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                !disabled && (input.trim() || isTyping) && "glow-hover"
              )}
            >
              {isTyping ? (
                <Square className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Voice Mode Indicator */}
          {isVoiceMode && (
            <div className="px-4 pb-3">
              <div className="flex items-center gap-2 text-xs text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Voice mode active</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
};
