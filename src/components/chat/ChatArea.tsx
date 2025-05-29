
import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatSearch } from './ChatSearch';
import { useChatStore } from '@/store/chatStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export const ChatArea: React.FC = () => {
  const { getCurrentConversation, deleteMessage, updateMessage } = useChatStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const conversation = getCurrentConversation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

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
    // TODO: Implement edit functionality
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

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <ChatSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        
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

          {/* Search hint */}
          <div className="text-xs text-white/30 font-light">
            Press Ctrl+F to search conversations
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
      <ChatSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
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
              <div className="text-xs text-white/30 font-light mt-4">
                Press Ctrl+F to search conversations
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8">
            {conversation.messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLast={index === conversation.messages.length - 1}
                onEditMessage={handleEditMessage}
                onDeleteMessage={handleDeleteMessage}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};
