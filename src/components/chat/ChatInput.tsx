
import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import { InputField } from './InputField';
import { InputActions } from './InputActions';
import { useInputHandlers } from '@/hooks/useInputHandlers';
import { useQuickMessageListener } from '@/hooks/useQuickMessageListener';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const { isVoiceMode, setVoiceMode, isTyping } = useChatStore();

  const {
    input,
    setInput,
    isFocused,
    setIsFocused,
    textareaRef,
    handleSubmit,
    handleKeyPress
  } = useInputHandlers(onSendMessage, disabled);

  useQuickMessageListener(onSendMessage);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setVoiceMode(!isVoiceMode);
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
          <InputField
            input={input}
            setInput={setInput}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            textareaRef={textareaRef}
            handleKeyPress={handleKeyPress}
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

        {/* Helper text */}
        <div className="flex justify-center gap-4 mt-3 text-xs text-white/40">
          <span>Press Enter to send</span>
          <span>•</span>
          <span>Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
};
