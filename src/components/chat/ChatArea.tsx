
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';

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
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600/20 to-navy-600/20 flex items-center justify-center glass">
            <div className="text-3xl">🤖</div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-navy-400 bg-clip-text text-transparent">
              Welcome to NGX Agents
            </h2>
            <p className="text-muted-foreground">
              Start a conversation to experience the power of advanced AI agents.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {[
              "What can you help me with?",
              "Explain quantum computing",
              "Write a Python function",
              "Plan a trip to Japan"
            ].map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-2 text-sm rounded-full glass hover:bg-white/10 transition-colors border border-border/50"
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
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 p-8">
              <div className="text-6xl mb-4">💭</div>
              <h3 className="text-xl font-medium text-muted-foreground">
                Start the conversation
              </h3>
              <p className="text-sm text-muted-foreground/80">
                Ask anything and I'll help you explore ideas and solve problems.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
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
