
import { useAgentStore } from '@/store/agentStore';
import { useChatStore } from '@/store/chatStore';
import { toastAI, toastSuccess } from '@/components/ui/enhanced-toast';

export const useChatMessageHandlers = () => {
  const {
    createConversation,
    addMessage,
    setTyping,
    getCurrentConversation,
    currentConversationId,
    updateMessage,
  } = useChatStore();
  
  const { getActiveAgent, analyzeUserIntent, setActiveAgent } = useAgentStore();

  const handleSendMessage = async (content: string) => {
    let conversationId = currentConversationId;
    
    if (!conversationId) {
      conversationId = createConversation();
    }

    const relevantAgents = analyzeUserIntent(content);
    const activeAgent = getActiveAgent();
    
    if (activeAgent?.id === 'orchestrator' && relevantAgents.length > 0) {
      setActiveAgent(relevantAgents[0]);
      toastAI('Agent switched', `Switched to ${relevantAgents[0]} for better assistance`);
    }

    const isBiometricsQuery = content.toLowerCase().includes('biometric') || 
                            content.toLowerCase().includes('hrv') ||
                            content.toLowerCase().includes('heart rate') ||
                            content.toLowerCase().includes('sleep') ||
                            content.toLowerCase().includes('recovery');

    if (isBiometricsQuery) {
      toastAI('Biometrics Dashboard', 'Showing your latest health metrics');
    }

    addMessage(conversationId, {
      content,
      role: 'user',
      agentId: getActiveAgent()?.id
    });

    setTyping(true);
    
    const typingMessageId = addMessage(conversationId, {
      content: '',
      role: 'assistant',
      isTyping: true,
      agentId: getActiveAgent()?.id
    });

    const response = generateAgentResponse(content, getActiveAgent());
    
    setTimeout(() => {
      updateMessage(conversationId!, typingMessageId, {
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

    return isBiometricsQuery;
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

  return { handleSendMessage };
};
