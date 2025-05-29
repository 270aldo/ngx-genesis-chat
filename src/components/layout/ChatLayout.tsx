
import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from '../chat/ChatArea';
import { ChatInput } from '../chat/ChatInput';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export const ChatLayout: React.FC = () => {
  const {
    createConversation,
    addMessage,
    setTyping,
    getCurrentConversation,
    currentConversationId,
    sidebarOpen,
    toggleSidebar,
  } = useChatStore();
  
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile && sidebarOpen) {
      toggleSidebar();
    }
  }, [isMobile]);

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
    }, 2000 + Math.random() * 1500);
  };

  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      `I understand you're asking about "${userMessage.toLowerCase()}". This is a fascinating topic that requires a nuanced approach. Let me provide you with a comprehensive analysis based on the latest developments and best practices in the field.`,
      `That's an excellent question regarding "${userMessage.toLowerCase()}". Based on my advanced processing capabilities, I can offer several key insights that will help you understand this complex subject matter.`,
      `Your inquiry about "${userMessage.toLowerCase()}" touches on several important concepts. Allow me to break this down systematically, providing you with actionable insights and practical solutions.`,
      `Thank you for bringing up "${userMessage.toLowerCase()}". This topic involves multiple interconnected elements that I'd be happy to explore with you in detail, offering both theoretical foundations and practical applications.`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-screen flex bg-background relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
      {/* Mobile Overlay for Sidebar */}
      {isMobile && sidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "relative z-50",
        isMobile && !sidebarOpen && "hidden"
      )}>
        <Sidebar />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none"></div>
        <ChatArea />
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};
