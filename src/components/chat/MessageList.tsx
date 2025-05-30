
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import type { Conversation } from '@/store/chatStore';

interface MessageListProps {
  conversation: Conversation;
  editingMessageId: string | null;
  onEditMessage: (messageId: string) => void;
  onDeleteMessage: (messageId: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  conversation,
  editingMessageId,
  onEditMessage,
  onDeleteMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  return (
    <div className="flex-1 overflow-y-auto relative chat-scroll-area">
      {/* Improved padding to prevent header interference */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 py-6">
          {conversation.messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLast={index === conversation.messages.length - 1}
              onEditMessage={onEditMessage}
              onDeleteMessage={onDeleteMessage}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};
