
import React from 'react';
import { Message } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { Bot, User, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex gap-6 group message-fade-in',
        isUser && 'flex-row-reverse',
        'hover:bg-white/[0.02] transition-all duration-300 rounded-2xl p-4 -mx-4'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center relative',
          isUser
            ? 'glass-premium border border-white/10'
            : 'glass-premium border border-blue-500/20 glow-subtle'
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white/80" />
        ) : (
          <>
            <Bot className="w-5 h-5 text-blue-400" />
            <Sparkles className="w-3 h-3 text-blue-300 absolute -top-1 -right-1" />
          </>
        )}
      </div>

      {/* Message Content */}
      <div className={cn('flex-1 space-y-3 max-w-4xl', isUser && 'flex flex-col items-end')}>
        {/* Message Bubble */}
        <div
          className={cn(
            'inline-block max-w-full rounded-2xl relative overflow-hidden',
            isUser
              ? 'glass-premium border border-white/10 px-6 py-4'
              : 'glass-ultra border border-blue-500/10 px-6 py-4',
            'backdrop-blur-xl'
          )}
        >
          {message.isTyping ? (
            <div className="flex items-center gap-2 py-2">
              <div className="flex gap-1">
                <div className="typing-dot-premium"></div>
                <div className="typing-dot-premium"></div>
                <div className="typing-dot-premium"></div>
              </div>
              <span className="text-sm text-muted-foreground ml-2">NGX Agent is thinking...</span>
            </div>
          ) : (
            <div className="text-sm leading-relaxed whitespace-pre-wrap font-light text-white/90">
              {message.content}
            </div>
          )}

          {/* Subtle shimmer effect */}
          {!message.isTyping && (
            <div className="absolute inset-0 shimmer-premium opacity-20 pointer-events-none"></div>
          )}
        </div>

        {/* Metadata */}
        {message.metadata && !message.isTyping && (
          <div className={cn('text-xs text-muted-foreground/50 space-x-4', isUser && 'text-right')}>
            {message.metadata.confidence && (
              <span className="inline-flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-green-400"></div>
                {Math.round(message.metadata.confidence * 100)}% confidence
              </span>
            )}
            {message.metadata.processingTime && (
              <span className="inline-flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                {message.metadata.processingTime}ms
              </span>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className={cn('text-xs text-muted-foreground/40 font-light', isUser && 'text-right')}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};
