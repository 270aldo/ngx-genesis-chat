
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export const ChatArea: React.FC = () => {
  const { getCurrentConversation } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversation = getCurrentConversation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full floating-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-8 max-w-2xl mx-auto p-8 relative z-10">
          {/* Main icon with premium effects */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 pulse-ring"></div>
            <div className="relative w-20 h-20 rounded-full glass-premium flex items-center justify-center glow-subtle">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          {/* Title and description */}
          <div className="space-y-4">
            <h1 className="text-4xl font-light tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              NGX Agents
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
              Experience the future of AI conversation with advanced agent intelligence.
            </p>
          </div>

          {/* Suggestion pills */}
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            {[
              "What can you create?",
              "Explain quantum computing",
              "Write efficient code",
              "Plan my next project"
            ].map((suggestion, index) => (
              <button
                key={index}
                className="px-6 py-3 text-sm font-medium rounded-full glass-ultra hover:glass-premium transition-all duration-300 border border-white/5 hover:border-white/10 hover:scale-105 shimmer-premium"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="max-w-5xl mx-auto px-6">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center min-h-full">
            <div className="text-center space-y-6 p-8">
              <div className="text-6xl mb-6 opacity-30">💭</div>
              <h3 className="text-2xl font-light text-white/80">
                Ready to begin
              </h3>
              <p className="text-sm text-muted-foreground/60 font-light">
                Start a conversation and explore endless possibilities
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8">
            {conversation.messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLast={index === conversation.messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};
