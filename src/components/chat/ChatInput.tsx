
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
        {/* Input Area */}
        <div className={cn(
          "relative group transition-all duration-500 ease-out",
          "bg-gradient-to-r from-purple-900/10 via-violet-900/5 to-purple-900/10",
          "backdrop-blur-2xl rounded-2xl",
          "border border-purple-500/20",
          "shadow-lg shadow-purple-500/5",
          isFocused && [
            "border-purple-400/40",
            "shadow-xl shadow-purple-500/10",
            "bg-gradient-to-r from-purple-900/15 via-violet-900/8 to-purple-900/15"
          ]
        )}>
          
          {/* Subtle inner glow when focused */}
          <div className={cn(
            "absolute inset-0 rounded-2xl transition-opacity duration-500",
            "bg-gradient-to-r from-purple-400/5 via-violet-400/3 to-purple-400/5",
            isFocused ? "opacity-100" : "opacity-0"
          )} />

          {/* Enhanced border glow effect */}
          <div className={cn(
            "absolute -inset-px rounded-2xl transition-opacity duration-500",
            "bg-gradient-to-r from-purple-500/20 via-violet-500/10 to-purple-500/20",
            "blur-sm",
            isFocused ? "opacity-100" : "opacity-0"
          )} />

          {/* Input Container */}
          <div className="relative flex items-end gap-4 p-5">
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
              <div className="flex items-center gap-3 text-sm text-purple-300/80 font-light">
                <div className="relative">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                </div>
                <span>Voice mode active - Listening...</span>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Quick Actions */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 text-xs text-white/40 font-light">
            <div className="w-1 h-1 bg-purple-400/60 rounded-full"></div>
            <span>Press Enter to send</span>
          </div>
          <div className="w-px h-3 bg-purple-500/20"></div>
          <div className="flex items-center gap-2 text-xs text-white/40 font-light">
            <div className="w-1 h-1 bg-violet-400/60 rounded-full"></div>
            <span>Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
};
