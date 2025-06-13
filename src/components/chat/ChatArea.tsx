
import { useRef, useEffect } from 'react';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';
import { WelcomeState } from './WelcomeState';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export const ChatArea = () => {
  const { getCurrentConversation, deleteMessage } = useChatStore();
  const { getActiveAgent } = useAgentStore();
  const isMobile = useIsMobile();
  const conversation = getCurrentConversation();
  const activeAgent = getActiveAgent();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleEditMessage = (messageId: string) => {
    const message = conversation?.messages.find(m => m.id === messageId);
    if (message && inputRef.current) {
      inputRef.current.value = message.content;
      inputRef.current.focus();
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (conversation) {
      deleteMessage(conversation.id, messageId);
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <WelcomeState />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Message Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {conversation.messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <WelcomeState />
          </div>
        ) : (
          <MessageList
            conversation={conversation}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
          />
        )}
      </div>

      {/* Chat Input */}
      <div className={cn(
        "relative z-20 border-t border-white/5 bg-black/20 backdrop-blur-xl",
        isMobile ? "p-3" : "p-4 sm:p-6"
      )}>
        <div className="max-w-5xl mx-auto">
          <ChatInput 
            activeAgent={activeAgent}
          />
        </div>
      </div>
    </div>
  );
};
