
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
    <div className="border-t border-purple-500/10 bg-black/20 backdrop-blur-xl p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Clean Input Area */}
        <div className={cn(
          "relative transition-all duration-300",
          "bg-gradient-to-r from-purple-900/20 to-violet-900/20",
          "backdrop-blur-xl rounded-2xl p-4",
          isFocused && "bg-gradient-to-r from-purple-900/30 to-violet-900/30"
        )}>
          
          <div className="flex items-end gap-4">
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
            <div className="mt-3 pt-3 border-t border-purple-500/20">
              <div className="flex items-center gap-3 text-sm text-purple-300/80">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Voice mode active - Listening...</span>
              </div>
            </div>
          )}
        </div>

        {/* Clean Quick Actions */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Press Enter to send</span>
          </div>
          <div className="w-px h-3 bg-purple-500/20"></div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
};
