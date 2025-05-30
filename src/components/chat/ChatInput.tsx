
import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
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
    <div className="border-t border-white/5 bg-background/80 backdrop-blur-xl p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Input Area */}
        <div className={cn(
          "relative glass-ultra rounded-3xl transition-all duration-300",
          isFocused && "glow-subtle",
          "overflow-hidden"
        )}>
          
          {/* Animated border effect - only when focused */}
          <div className={cn(
            "absolute inset-0 rounded-3xl transition-opacity duration-300",
            isFocused ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm"></div>
          </div>

          {/* Input Area */}
          <div className="relative flex items-end gap-3 p-4">
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

          {/* Voice Mode Indicator */}
          {isVoiceMode && (
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 text-xs text-blue-400/80 font-light">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Voice mode active</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/30 font-light">
          <span>Press Enter to send • Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
};
