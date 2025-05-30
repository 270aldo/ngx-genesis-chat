import React from 'react';
import { Button } from '@/components/ui/button';
import { useAgentStore } from '@/store/agentStore';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
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
  Heart,
  Shield,
  Wind,
  Snowflake,
  Sun,
  Trophy,
  Map,
  CheckCircle
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
  ],
  'recovery-corrective': [
    { label: 'Recovery Assessment', icon: Activity, prompt: 'Analyze my current recovery status based on sleep, HRV, and fatigue levels' },
    { label: 'Mobility Plan', icon: Dumbbell, prompt: 'Create a personalized mobility and stretching routine for me' },
    { label: 'Injury Prevention', icon: Shield, prompt: 'Identify my injury risk factors and create prevention strategies' },
    { label: 'Sleep Optimization', icon: Moon, prompt: 'Help me optimize my sleep for better recovery' },
    { label: 'Stress Management', icon: Heart, prompt: 'Teach me techniques to manage physical and mental stress' }
  ],
  'biohacking-innovator': [
    { label: 'Cold Therapy', icon: Snowflake, prompt: 'Design a progressive cold exposure routine for recovery and resilience' },
    { label: 'Breathwork', icon: Wind, prompt: 'Teach me advanced breathing techniques for performance and recovery' },
    { label: 'Supplement Stack', icon: Apple, prompt: 'Create a personalized supplement protocol based on my goals' },
    { label: 'Fasting Protocol', icon: Clock, prompt: 'Design a safe and effective intermittent fasting schedule for me' },
    { label: 'Circadian Rhythm', icon: Sun, prompt: 'Help me optimize my body clock for better sleep and energy' }
  ],
  'success-liaison': [
    { label: 'Weekly Check-in', icon: Calendar, prompt: 'Let\'s do a weekly check-in to review my progress and adjust my plan' },
    { label: 'Goal Review', icon: Target, prompt: 'Help me evaluate and refine my fitness goals based on my progress' },
    { label: 'Motivation Boost', icon: Heart, prompt: 'I need some personalized encouragement to overcome mental barriers' },
    { label: 'Success Planning', icon: Map, prompt: 'Create a comprehensive roadmap for achieving my fitness goals' },
    { label: 'Habit Tracker', icon: CheckCircle, prompt: 'Help me track and optimize my daily wellness habits' },
    { label: 'Celebrate Wins', icon: Trophy, prompt: 'Let\'s acknowledge my achievements and plan some rewards' }
  ]
};

export const AgentQuickActions: React.FC = () => {
  const { getActiveAgent } = useAgentStore();
  const { addMessage, getCurrentConversation, createConversation } = useChatStore();
  const isMobile = useIsMobile();
  
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

  // Responsive action limits
  const getMaxActions = () => {
    if (isMobile) {
      return ['recovery-corrective', 'biohacking-innovator', 'success-liaison'].includes(activeAgent?.id || '') ? 4 : 3;
    }
    return ['recovery-corrective', 'biohacking-innovator', 'success-liaison'].includes(activeAgent?.id || '') ? 6 : 3;
  };

  const maxActions = getMaxActions();

  return (
    <div className="px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-white/60">Quick Actions</p>
        {actions.length > maxActions && (
          <p className="text-xs text-white/40">{actions.length} available</p>
        )}
      </div>
      
      {/* Improved responsive grid */}
      <div className={cn(
        "grid gap-2",
        // Mobile: always 2 columns for better space usage
        isMobile ? "grid-cols-2" : (
          // Desktop: 3 columns for standard agents, 3 for specialized
          maxActions === 6 ? "grid-cols-3" : "grid-cols-3"
        )
      )}>
        {actions.slice(0, maxActions).map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className={cn(
                "flex flex-col gap-1.5 h-auto text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-xl border border-transparent hover:border-white/10 transition-all duration-200",
                // Responsive padding
                isMobile ? "py-2.5 px-2" : "py-3 px-3"
              )}
            >
              <Icon className={cn("flex-shrink-0", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
              <span className={cn(
                "leading-tight text-center font-medium",
                isMobile ? "text-[10px]" : "text-xs"
              )}>
                {action.label}
              </span>
            </Button>
          );
        })}
      </div>
      
      {/* Overflow indicator */}
      {actions.length > maxActions && (
        <div className="mt-3 text-center">
          <span className="text-xs text-white/40">
            +{actions.length - maxActions} more actions available in chat
          </span>
        </div>
      )}
    </div>
  );
};
