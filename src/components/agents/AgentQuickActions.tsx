
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAgentStore } from '@/store/agentStore';
import { useChatStore } from '@/store/chatStore';
import { 
  Dumbbell, 
  Calendar, 
  Camera, 
  BarChart3, 
  Target, 
  Clock,
  Apple,
  Utensils,
  Activity,
  Moon,
  Zap,
  Heart
} from 'lucide-react';

const agentActions = {
  'training-strategist': [
    { label: 'Create Workout Plan', icon: Dumbbell, prompt: 'Create a personalized workout plan for me' },
    { label: 'Schedule Training', icon: Calendar, prompt: 'Help me schedule my training sessions' },
    { label: 'Form Check', icon: Camera, prompt: 'I want to check my exercise form' }
  ],
  'nutrition-architect': [
    { label: 'Meal Plan', icon: Utensils, prompt: 'Create a meal plan for my goals' },
    { label: 'Food Analysis', icon: Camera, prompt: 'Analyze this food photo' },
    { label: 'Macro Calculator', icon: BarChart3, prompt: 'Calculate my daily macros' }
  ],
  'biometrics-engine': [
    { label: 'Analyze Sleep', icon: Moon, prompt: 'Analyze my sleep data from last week' },
    { label: 'HRV Insights', icon: Activity, prompt: 'What do my HRV trends mean?' },
    { label: 'Recovery Score', icon: Heart, prompt: 'Show me my current recovery status' }
  ],
  'motivation-coach': [
    { label: 'Set Goals', icon: Target, prompt: 'Help me set realistic fitness goals' },
    { label: 'Build Habits', icon: Clock, prompt: 'Help me build a workout habit' },
    { label: 'Overcome Barriers', icon: Zap, prompt: 'I\'m struggling with motivation' }
  ],
  'progress-tracker': [
    { label: 'Progress Report', icon: BarChart3, prompt: 'Show me my progress report' },
    { label: 'Goal Timeline', icon: Calendar, prompt: 'When will I reach my goals?' },
    { label: 'Photo Comparison', icon: Camera, prompt: 'Compare my progress photos' }
  ]
};

export const AgentQuickActions: React.FC = () => {
  const { getActiveAgent } = useAgentStore();
  const { addMessage, getCurrentConversation, createConversation } = useChatStore();
  
  const activeAgent = getActiveAgent();
  const actions = activeAgent ? agentActions[activeAgent.id as keyof typeof agentActions] || [] : [];

  const handleQuickAction = (prompt: string) => {
    let conversationId = getCurrentConversation()?.id;
    
    if (!conversationId) {
      conversationId = createConversation();
    }

    addMessage(conversationId, {
      content: prompt,
      role: 'user',
      agentId: activeAgent?.id
    });
  };

  if (actions.length === 0) return null;

  return (
    <div className="px-4 py-3 border-b border-white/10">
      <p className="text-xs text-white/60 mb-3">Quick Actions</p>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="flex flex-col gap-1 h-16 text-xs text-white/70 hover:text-white hover:bg-white/10 p-2"
            >
              <Icon className="w-4 h-4" />
              <span className="leading-tight text-center">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
