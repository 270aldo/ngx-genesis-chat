
import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import { InputField } from './InputField';
import { InputActions } from './InputActions';
import { useInputHandlers } from '@/hooks/useInputHandlers';
import { useQuickMessageListener } from '@/hooks/useQuickMessageListener';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const { isVoiceMode, setVoiceMode, isTyping } = useChatStore();
  const isMobile = useIsMobile();

  const {
    input,
    setInput,
    isFocused,
    setIsFocused,
    textareaRef,
    handleSubmit,
    handleKeyDown
  } = useInputHandlers(onSendMessage, disabled);

  useQuickMessageListener(onSendMessage);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setVoiceMode(!isVoiceMode);
  };

  return (
    <div className={cn("p-4", isMobile && "p-3 pb-safe")}>
      <div className="max-w-4xl mx-auto">
        <div className={cn(
          "flex items-end gap-3 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20",
          isMobile ? "p-2.5" : "p-3"
        )}>
          <InputField
            input={input}
            setInput={setInput}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            textareaRef={textareaRef}
            handleKeyDown={handleKeyDown}
            disabled={disabled}
            isTyping={isTyping}
          />

          <InputActions
            disabled={disabled}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            isTyping={isTyping}
            input={input}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
