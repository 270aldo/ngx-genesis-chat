
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Brain } from 'lucide-react';
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
        placeholder={isTyping ? "NGX Agent is thinking..." : "Ask me anything..."}
        disabled={disabled || isTyping}
        className={cn(
          "min-h-[52px] max-h-[140px] resize-none",
          "border-0 bg-transparent shadow-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          "px-0 py-2 text-base",
          "placeholder:text-white/40 text-white/90",
          "transition-all duration-200"
        )}
        rows={1}
      />
      
      {/* Clean Typing Indicator */}
      {isTyping && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-purple-500/10">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/70">Generating response...</span>
          </div>
        </div>
      )}
    </div>
  );
};
