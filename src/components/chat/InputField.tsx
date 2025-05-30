
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

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
    <div className="flex-1">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isTyping ? "NGX Agent is thinking..." : "Ask me anything..."}
        disabled={disabled || isTyping}
        className="min-h-[48px] max-h-[120px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-2 text-white placeholder:text-white/50"
        rows={1}
      />
    </div>
  );
};
