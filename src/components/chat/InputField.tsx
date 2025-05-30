
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Brain } from 'lucide-react';
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
          "min-h-[52px] max-h-[140px] resize-none border-0 bg-transparent",
          "focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-4",
          "placeholder:text-white/35 text-white/95 font-light text-base leading-relaxed",
          "scrollbar-none transition-all duration-300",
          isFocused && "placeholder:text-white/50"
        )}
        rows={1}
      />
      
      {/* Enhanced Typing Indicator */}
      {isTyping && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl">
          <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 backdrop-blur-sm border border-purple-500/20">
            <div className="flex gap-1.5">
              <div className="typing-dot-premium bg-gradient-to-r from-purple-400 to-violet-400"></div>
              <div className="typing-dot-premium bg-gradient-to-r from-purple-400 to-violet-400"></div>
              <div className="typing-dot-premium bg-gradient-to-r from-purple-400 to-violet-400"></div>
            </div>
            <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-sm font-light text-white/80">Generating response...</span>
          </div>
        </div>
      )}

      {/* Input Enhancement Indicator */}
      {isFocused && !isTyping && (
        <div className="absolute bottom-1 right-1 opacity-60">
          <Sparkles className="w-3 h-3 text-purple-400/60" />
        </div>
      )}
    </div>
  );
};
