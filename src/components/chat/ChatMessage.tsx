
import React from 'react';
import { Message } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

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
        'flex gap-4 p-4 group message-enter',
        isUser && 'flex-row-reverse',
        'hover:bg-white/5 transition-colors duration-200'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-gradient-to-br from-purple-500 to-purple-700 glass'
            : 'bg-gradient-to-br from-navy-600 to-navy-800 glass'
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn('flex-1 space-y-2', isUser && 'flex flex-col items-end')}>
        {/* Message Bubble */}
        <div
          className={cn(
            'inline-block max-w-[80%] p-4 rounded-2xl glass-dark',
            isUser
              ? 'bg-gradient-to-br from-purple-600/20 to-purple-500/10 border-purple-500/20'
              : 'bg-gradient-to-br from-navy-800/40 to-navy-700/20 border-navy-500/20',
            'backdrop-blur-md border'
          )}
        >
          {message.isTyping ? (
            <div className="flex items-center gap-1">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          ) : (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          )}
        </div>

        {/* Metadata */}
        {message.metadata && !message.isTyping && (
          <div className={cn('text-xs text-muted-foreground', isUser && 'text-right')}>
            {message.metadata.confidence && (
              <span className="mr-2">
                Confidence: {Math.round(message.metadata.confidence * 100)}%
              </span>
            )}
            {message.metadata.processingTime && (
              <span>
                {message.metadata.processingTime}ms
              </span>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className={cn('text-xs text-muted-foreground', isUser && 'text-right')}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};
