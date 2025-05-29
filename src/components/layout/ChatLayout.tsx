
import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from '../chat/ChatArea';
import { ChatInput } from '../chat/ChatInput';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';

export const ChatLayout: React.FC = () => {
  const {
    createConversation,
    addMessage,
    setTyping,
    getCurrentConversation,
    currentConversationId,
  } = useChatStore();

  const handleSendMessage = async (content: string) => {
    let conversationId = currentConversationId;
    
    // Create a new conversation if none exists
    if (!conversationId) {
      conversationId = createConversation();
    }

    // Add user message
    addMessage(conversationId, {
      content,
      role: 'user',
    });

    // Simulate typing and AI response
    setTyping(true);
    
    // Add typing indicator
    const typingMessageId = crypto.randomUUID();
    addMessage(conversationId, {
      content: '',
      role: 'assistant',
      isTyping: true,
    });

    // Simulate API delay
    setTimeout(() => {
      // Remove typing indicator and add actual response
      const conversation = getCurrentConversation();
      if (conversation) {
        // Remove the typing message
        const updatedMessages = conversation.messages.filter(msg => !msg.isTyping);
        
        // Add actual AI response
        addMessage(conversationId!, {
          content: generateMockResponse(content),
          role: 'assistant',
          metadata: {
            confidence: 0.95,
            processingTime: Math.floor(Math.random() * 1000) + 500,
            tokens: Math.floor(Math.random() * 100) + 50,
          },
        });
      }
      
      setTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      "I understand your question about " + userMessage.toLowerCase() + ". This is a fascinating topic that involves multiple considerations. Let me break this down for you systematically.",
      "That's an excellent question! Based on my analysis, there are several key points to consider regarding " + userMessage.toLowerCase() + ".",
      "I can help you with that. The topic of " + userMessage.toLowerCase() + " is quite complex, so let me provide you with a comprehensive overview.",
      "Thank you for your inquiry. This relates to several important concepts that I'd be happy to explain in detail.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
