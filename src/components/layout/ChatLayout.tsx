import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from '../chat/ChatArea';
import { ChatInput } from '../chat/ChatInput';
import { AgentSelector } from '../agents/AgentSelector';
import { AgentQuickActions } from '../agents/AgentQuickActions';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
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
  
  const { getActiveAgent, analyzeUserIntent, setActiveAgent } = useAgentStore();
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

    // Analyze user intent and suggest relevant agent
    const relevantAgents = analyzeUserIntent(content);
    const activeAgent = getActiveAgent();
    
    // Auto-switch to most relevant agent if using orchestrator
    if (activeAgent?.id === 'orchestrator' && relevantAgents.length > 0) {
      setActiveAgent(relevantAgents[0]);
    }

    // Add user message
    addMessage(conversationId, {
      content,
      role: 'user',
      agentId: getActiveAgent()?.id
    });

    // Simulate typing and AI response
    setTyping(true);
    
    // Add typing indicator
    addMessage(conversationId, {
      content: '',
      role: 'assistant',
      isTyping: true,
      agentId: getActiveAgent()?.id
    });

    // Simulate API delay
    setTimeout(() => {
      // Remove typing indicator and add actual response
      const conversation = getCurrentConversation();
      if (conversation) {
        // Generate agent-specific response
        const response = generateAgentResponse(content, getActiveAgent());
        
        // Add actual AI response
        addMessage(conversationId!, {
          content: response.content,
          role: 'assistant',
          agentId: getActiveAgent()?.id,
          metadata: {
            confidence: 0.95,
            processingTime: Math.floor(Math.random() * 1000) + 500,
            tokens: Math.floor(Math.random() * 100) + 50,
            agentName: getActiveAgent()?.name,
            agentAvatar: getActiveAgent()?.avatar
          },
        });
      }
      
      setTyping(false);
    }, 2000 + Math.random() * 1500);
  };

  const generateAgentResponse = (userMessage: string, agent: any) => {
    const responses = {
      'training-strategist': [
        `Based on your request "${userMessage.toLowerCase()}", I'll design a personalized training program. Your current fitness level and goals suggest we should focus on progressive overload with compound movements. Let me create a structured plan that will maximize your results while ensuring proper recovery.`,
        `Great question about "${userMessage.toLowerCase()}"! As your Elite Training Strategist, I recommend implementing periodization to optimize your training adaptations. Here's a comprehensive approach that balances intensity, volume, and recovery for sustainable progress.`
      ],
      'nutrition-architect': [
        `Analyzing your nutrition query about "${userMessage.toLowerCase()}", I can see this is an excellent opportunity to optimize your fuel strategy. Based on your goals and metabolic profile, here's a precision nutrition approach that will support your training and recovery needs.`,
        `Perfect timing for this nutrition question! Regarding "${userMessage.toLowerCase()}", let me break down the macro and micronutrient considerations that will accelerate your results while maintaining metabolic flexibility.`
      ],
      'biometrics-engine': [
        `Your biometric data shows interesting patterns related to "${userMessage.toLowerCase()}". I've analyzed your sleep, HRV, and recovery metrics to provide actionable insights. Here's what your body is telling us and how to optimize your health markers.`,
        `Excellent question about "${userMessage.toLowerCase()}"! The data from your wearables reveals key trends in your physiological responses. Let me translate these metrics into practical recommendations for enhanced performance and recovery.`
      ],
      'orchestrator': [
        `I understand you're asking about "${userMessage.toLowerCase()}". Let me coordinate with our specialist team to provide you with a comprehensive response. I'll consult with our Training, Nutrition, and Biometrics experts to give you the most complete guidance.`,
        `Great question! For "${userMessage.toLowerCase()}", I'm analyzing which of our specialists can provide the most valuable insights. This appears to involve multiple areas of expertise, so I'll synthesize recommendations from our entire team.`
      ]
    };

    const agentResponses = responses[agent?.id as keyof typeof responses] || responses['orchestrator'];
    return {
      content: agentResponses[Math.floor(Math.random() * agentResponses.length)]
    };
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
        
        {/* Agent Controls */}
        <AgentSelector />
        <AgentQuickActions />
        
        <ChatArea />
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};
