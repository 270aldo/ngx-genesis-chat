
import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useQuickMessageListener } from '@/hooks/useQuickMessageListener';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ArrowUp, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const { isTyping } = useChatStore();
  const isMobile = useIsMobile();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useQuickMessageListener(onSendMessage);

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

  return (
    <div className={cn("w-full max-w-3xl mx-auto", isMobile && "px-3")}>
      <div className="bg-black border border-violet-800 rounded-2xl shadow-lg shadow-violet-800/10">
        <div className={cn("p-2", isMobile ? "md:p-2" : "md:p-4")}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isTyping ? "NGX Agent is thinking..." : "Ask me anything..."}
            disabled={disabled || isTyping}
            className="w-full text-base md:text-lg placeholder-gray-400 bg-transparent outline-none resize-none p-2 text-white"
            rows={2}
          />
        </div>
        <div className="flex items-center justify-between mt-2 px-4 pb-3 border-t border-violet-800 pt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 hover:bg-violet-900/50 rounded-lg transition-colors"
              disabled={disabled}
            >
              <Paperclip className="w-5 h-5 text-violet-500" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Model 2.0</span>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={(!input.trim() && !isTyping) || disabled}
              className="p-2.5 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors disabled:opacity-50"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
