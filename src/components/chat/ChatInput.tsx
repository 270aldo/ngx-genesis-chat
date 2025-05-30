
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff, Paperclip, Square, Sparkles } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isVoiceMode, setVoiceMode, isTyping } = useChatStore();
  const { getActiveAgent } = useAgentStore();

  const activeAgent = getActiveAgent();

  // Get quick messages for active agent
  const getQuickMessages = () => {
    if (!activeAgent) return [];

    const commonMessages = [
      "¿Cómo puedo empezar?",
      "Dame una recomendación",
      "Explícame los fundamentos"
    ];

    const agentSpecificMessages = {
      'training-strategist': [
        "Diseña un plan de entrenamiento",
        "¿Cómo mejoro mi fuerza?",
        "Rutina para ganar músculo",
        "Ejercicios para quemar grasa"
      ],
      'nutrition-architect': [
        "Calcula mis macros diarios",
        "Plan de comidas saludable",
        "¿Qué suplementos necesito?",
        "Recetas rápidas y nutritivas"
      ],
      'biometrics-engine': [
        "Analiza mis métricas de sueño",
        "¿Cómo mejorar mi recuperación?",
        "Interpreta mi variabilidad cardíaca",
        "Optimiza mis horarios"
      ],
      'orchestrator': [
        "Crea un plan integral",
        "Coordina mis objetivos",
        "¿Qué agente necesito?",
        "Análisis completo"
      ]
    };

    const specific = agentSpecificMessages[activeAgent.id as keyof typeof agentSpecificMessages] || [];
    return [...commonMessages, ...specific];
  };

  const quickMessages = getQuickMessages();

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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setVoiceMode(!isVoiceMode);
  };

  const handleQuickMessage = (message: string) => {
    onSendMessage(message);
  };

  return (
    <div className="border-t border-white/5 bg-background/80 backdrop-blur-xl p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Quick Messages */}
        {quickMessages.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Sparkles className="w-4 h-4" />
              <span>Mensajes rápidos para {activeAgent?.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickMessages.slice(0, 8).map((message, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickMessage(message)}
                  disabled={disabled || isTyping}
                  className={cn(
                    "h-9 px-4 py-2 text-sm font-light rounded-full transition-all duration-200",
                    "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white",
                    "border border-white/10 hover:border-white/20",
                    "disabled:opacity-30 disabled:cursor-not-allowed"
                  )}
                >
                  <span className="truncate max-w-[200px]">{message}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className={cn(
          "relative glass-ultra rounded-3xl border transition-all duration-300",
          isFocused 
            ? "border-blue-500/30 glow-subtle" 
            : "border-white/10",
          "overflow-hidden"
        )}>
          
          {/* Animated border effect */}
          <div className={cn(
            "absolute inset-0 rounded-3xl transition-opacity duration-300",
            isFocused ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm"></div>
          </div>

          {/* Input Area */}
          <div className="relative flex items-end gap-3 p-4">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-10 w-10 text-white/40 hover:text-white/60 hover:bg-white/5 transition-all duration-200 rounded-xl"
              disabled={disabled}
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            {/* Text Input */}
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

            {/* Voice Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRecording}
              disabled={disabled}
              className={cn(
                "shrink-0 h-10 w-10 transition-all duration-300 rounded-xl premium-button",
                isRecording
                  ? "text-red-400 hover:text-red-300 glow-primary"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              )}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>

            {/* Send/Stop Button */}
            <Button
              onClick={isTyping ? () => {} : handleSubmit}
              disabled={(!input.trim() && !isTyping) || disabled}
              size="icon"
              className={cn(
                "shrink-0 h-10 w-10 rounded-xl transition-all duration-300 premium-button",
                isTyping
                  ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
                  : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                !disabled && (input.trim() || isTyping) && "glow-subtle shadow-lg"
              )}
            >
              {isTyping ? (
                <Square className="h-4 w-4 text-white/80" />
              ) : (
                <Send className="h-4 w-4 text-white/80" />
              )}
            </Button>
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
