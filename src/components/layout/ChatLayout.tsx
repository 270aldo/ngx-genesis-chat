
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from '../chat/ChatArea';
import { ChatInput } from '../chat/ChatInput';
import { AgentSelector } from '../agents/AgentSelector';
import { QuickActionsButton } from '../chat/QuickActionsButton';
import { ExportOptions } from '../chat/ExportOptions';
import { BiometricsOverview } from '../biometrics/BiometricsOverview';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatShortcuts } from '@/hooks/useKeyboardShortcuts';
import { toastAI, toastSuccess } from '@/components/ui/enhanced-toast';
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
    updateMessage,
  } = useChatStore();
  
  const { getActiveAgent, analyzeUserIntent, setActiveAgent } = useAgentStore();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showBiometrics, setShowBiometrics] = useState(false);

  // Keyboard shortcuts
  useChatShortcuts({
    onSearch: () => setIsSearchOpen(true),
    onNewChat: () => {
      createConversation();
      toastSuccess('New conversation created');
    },
    onToggleSidebar: () => toggleSidebar(),
    onFocusInput: () => {
      const input = document.querySelector('textarea');
      input?.focus();
    }
  });

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
      toastAI('Agent switched', `Switched to ${relevantAgents[0]} for better assistance`);
    }

    // Check if user is asking about biometrics
    const isBiometricsQuery = content.toLowerCase().includes('biometric') || 
                            content.toLowerCase().includes('hrv') ||
                            content.toLowerCase().includes('heart rate') ||
                            content.toLowerCase().includes('sleep') ||
                            content.toLowerCase().includes('recovery');

    if (isBiometricsQuery) {
      setShowBiometrics(true);
      toastAI('Biometrics Dashboard', 'Showing your latest health metrics');
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
    const typingMessageId = addMessage(conversationId, {
      content: '',
      role: 'assistant',
      isTyping: true,
      agentId: getActiveAgent()?.id
    });

    // Generate agent-specific response
    const response = generateAgentResponse(content, getActiveAgent());
    
    // Simulate API delay
    setTimeout(() => {
      // Remove typing indicator by updating the message
      updateMessage(conversationId!, typingMessageId.id, {
        content: response.content,
        isTyping: false,
        metadata: {
          confidence: 0.95,
          processingTime: Math.floor(Math.random() * 1000) + 500,
          tokens: Math.floor(Math.random() * 100) + 50,
          agentName: getActiveAgent()?.name,
          agentAvatar: getActiveAgent()?.avatar
        },
      });
      
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
        
        {/* Simplified Header Layout */}
        <div className="relative z-10 border-b border-white/5">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex-1 min-w-0">
              <AgentSelector />
            </div>
            <div className="ml-4 flex-shrink-0 flex items-center gap-3">
              <QuickActionsButton />
              {getActiveAgent()?.id === 'biometrics-engine' && (
                <button
                  onClick={() => setShowBiometrics(!showBiometrics)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full transition-all duration-200",
                    showBiometrics 
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                      : "bg-white/10 text-white/60 border border-white/10 hover:bg-white/20"
                  )}
                >
                  {showBiometrics ? 'Hide' : 'Show'} Biometrics
                </button>
              )}
              <ExportOptions />
            </div>
          </div>
        </div>
        
        {/* Chat Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {showBiometrics && getActiveAgent()?.id === 'biometrics-engine' ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-white/90 mb-2">Biometrics Dashboard</h2>
                  <p className="text-white/60 text-sm">Real-time health and performance metrics</p>
                </div>
                <BiometricsOverview />
              </div>
            </div>
          ) : (
            <ChatArea />
          )}
          
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 left-4 text-xs text-white/30 font-light hidden lg:block">
        <div className="space-y-1">
          <div>Ctrl+F: Search • Ctrl+N: New Chat</div>
          <div>Ctrl+B: Toggle Sidebar • /: Focus Input</div>
        </div>
      </div>
    </div>
  );
};
