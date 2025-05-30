
import React, { useState, useEffect } from 'react';
import { ChatSearch } from './ChatSearch';
import { EmptyState } from './EmptyState';
import { WelcomeState } from './WelcomeState';
import { MessageList } from './MessageList';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { useToast } from '@/hooks/use-toast';

export const ChatArea: React.FC = () => {
  const { getCurrentConversation, deleteMessage } = useChatStore();
  const { getActiveAgent } = useAgentStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const { toast } = useToast();
  const conversation = getCurrentConversation();
  const activeAgent = getActiveAgent();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'f') {
          event.preventDefault();
          setIsSearchOpen(true);
        }
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setEditingMessageId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEditMessage = (messageId: string) => {
    setEditingMessageId(messageId);
    toast({
      title: "Edit functionality",
      description: "Message editing will be implemented in the next iteration.",
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    if (conversation) {
      deleteMessage(conversation.id, messageId);
      toast({
        title: "Message deleted",
        description: "The message has been removed from the conversation.",
      });
    }
  };

  const handleQuickMessage = (message: string) => {
    // Dispatch a custom event to send the message
    const event = new CustomEvent('quickMessageSelected', {
      detail: { message }
    });
    window.dispatchEvent(event);
  };

  if (!conversation) {
    return (
      <>
        <ChatSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <EmptyState activeAgent={activeAgent} onQuickMessage={handleQuickMessage} />
      </>
    );
  }

  if (conversation.messages.length === 0) {
    return (
      <>
        <ChatSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <WelcomeState activeAgent={activeAgent} />
      </>
    );
  }

  return (
    <>
      <ChatSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MessageList
        conversation={conversation}
        editingMessageId={editingMessageId}
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
      />
    </>
  );
};
