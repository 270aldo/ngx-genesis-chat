
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputFieldProps {
  input: string;
  setInput: (value: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  isTyping: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  input,
  setInput,
  isFocused,
  setIsFocused,
  textareaRef,
  handleKeyPress,
  disabled,
  isTyping
}) => {
  return (
    <div className="flex-1 relative">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isTyping ? "NGX Agent is responding..." : "Type your message..."}
        disabled={disabled || isTyping}
        className={cn(
          "min-h-[48px] max-h-[120px] resize-none border-0 bg-transparent",
          "focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-3",
          "placeholder:text-white/30 text-white/90 font-light text-base",
          "scrollbar-none"
        )}
        rows={1}
      />
      
      {/* Typing Indicator Overlay */}
      {isTyping && (
        <div className="absolute inset-0 flex items-center justify-center glass-premium rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="flex gap-1">
              <div className="typing-dot-premium"></div>
              <div className="typing-dot-premium"></div>
              <div className="typing-dot-premium"></div>
            </div>
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="font-light">Generating response...</span>
          </div>
        </div>
      )}
    </div>
  );
};
