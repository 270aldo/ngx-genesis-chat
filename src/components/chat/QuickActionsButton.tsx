
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useAgentStore } from '@/store/agentStore';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Zap, 
  Dumbbell, 
  Calendar, 
  Camera, 
  Utensils, 
  BarChart3, 
  Moon, 
  Activity, 
  Heart, 
  Target, 
  Clock, 
  Shield, 
  Snowflake, 
  Wind, 
  Apple, 
  Sun, 
  CheckCircle, 
  Trophy,
  Map
} from 'lucide-react';

const agentActions = {
  'training-strategist': [{
    label: 'Create Workout Plan',
    icon: Dumbbell,
    prompt: 'Create a personalized workout plan for me'
  }, {
    label: 'Schedule Training',
    icon: Calendar,
    prompt: 'Help me schedule my training sessions'
  }, {
    label: 'Form Check',
    icon: Camera,
    prompt: 'I want to check my exercise form'
  }],
  'nutrition-architect': [{
    label: 'Meal Plan',
    icon: Utensils,
    prompt: 'Create a meal plan for my goals'
  }, {
    label: 'Food Analysis',
    icon: Camera,
    prompt: 'Analyze this food photo'
  }, {
    label: 'Macro Calculator',
    icon: BarChart3,
    prompt: 'Calculate my daily macros'
  }],
  'biometrics-engine': [{
    label: 'Analyze Sleep',
    icon: Moon,
    prompt: 'Analyze my sleep data from last week'
  }, {
    label: 'HRV Insights',
    icon: Activity,
    prompt: 'What do my HRV trends mean?'
  }, {
    label: 'Recovery Score',
    icon: Heart,
    prompt: 'Show me my current recovery status'
  }],
  'motivation-coach': [{
    label: 'Set Goals',
    icon: Target,
    prompt: 'Help me set realistic fitness goals'
  }, {
    label: 'Build Habits',
    icon: Clock,
    prompt: 'Help me build a workout habit'
  }, {
    label: 'Overcome Barriers',
    icon: Zap,
    prompt: 'I\'m struggling with motivation'
  }],
  'progress-tracker': [{
    label: 'Progress Report',
    icon: BarChart3,
    prompt: 'Show me my progress report'
  }, {
    label: 'Goal Timeline',
    icon: Calendar,
    prompt: 'When will I reach my goals?'
  }, {
    label: 'Photo Comparison',
    icon: Camera,
    prompt: 'Compare my progress photos'
  }],
  'recovery-corrective': [{
    label: 'Recovery Assessment',
    icon: Activity,
    prompt: 'Analyze my current recovery status based on sleep, HRV, and fatigue levels'
  }, {
    label: 'Mobility Plan',
    icon: Dumbbell,
    prompt: 'Create a personalized mobility and stretching routine for me'
  }, {
    label: 'Injury Prevention',
    icon: Shield,
    prompt: 'Identify my injury risk factors and create prevention strategies'
  }, {
    label: 'Sleep Optimization',
    icon: Moon,
    prompt: 'Help me optimize my sleep for better recovery'
  }, {
    label: 'Stress Management',
    icon: Heart,
    prompt: 'Teach me techniques to manage physical and mental stress'
  }],
  'biohacking-innovator': [{
    label: 'Cold Therapy',
    icon: Snowflake,
    prompt: 'Design a progressive cold exposure routine for recovery and resilience'
  }, {
    label: 'Breathwork',
    icon: Wind,
    prompt: 'Teach me advanced breathing techniques for performance and recovery'
  }, {
    label: 'Supplement Stack',
    icon: Apple,
    prompt: 'Create a personalized supplement protocol based on my goals'
  }, {
    label: 'Fasting Protocol',
    icon: Clock,
    prompt: 'Design a safe and effective intermittent fasting schedule for me'
  }, {
    label: 'Circadian Rhythm',
    icon: Sun,
    prompt: 'Help me optimize my body clock for better sleep and energy'
  }],
  'success-liaison': [{
    label: 'Weekly Check-in',
    icon: Calendar,
    prompt: 'Let\'s do a weekly check-in to review my progress and adjust my plan'
  }, {
    label: 'Goal Review',
    icon: Target,
    prompt: 'Help me evaluate and refine my fitness goals based on my progress'
  }, {
    label: 'Motivation Boost',
    icon: Heart,
    prompt: 'I need some personalized encouragement to overcome mental barriers'
  }, {
    label: 'Success Planning',
    icon: Map,
    prompt: 'Create a comprehensive roadmap for achieving my fitness goals'
  }, {
    label: 'Habit Tracker',
    icon: CheckCircle,
    prompt: 'Help me track and optimize my daily wellness habits'
  }, {
    label: 'Celebrate Wins',
    icon: Trophy,
    prompt: 'Let\'s acknowledge my achievements and plan some rewards'
  }]
};

export const QuickActionsButton: React.FC = () => {
  const {
    getActiveAgent
  } = useAgentStore();
  const {
    addMessage,
    getCurrentConversation,
    createConversation
  } = useChatStore();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const activeAgent = getActiveAgent();
  const actions = activeAgent ? agentActions[activeAgent.id as keyof typeof agentActions] || [] : [];
  
  // Solo mostrar si hay una conversación activa
  const currentConversation = getCurrentConversation();
  if (!currentConversation || actions.length === 0) {
    return null;
  }
  
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
    setOpen(false);
  };
  
  return <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          className="relative text-white/70 hover:text-white hover:bg-white/10 rounded-lg border border-transparent hover:border-purple-500/30 transition-all duration-200"
        >
          <Zap className="w-4 h-4" />
          {!isMobile && (
            <>
              <span className="ml-2 text-sm">Quick Actions</span>
              <Badge variant="secondary" className="ml-2 bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
                {actions.length}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "p-4 bg-black/90 backdrop-blur-xl border border-purple-500/20",
          isMobile ? "w-72" : "w-80"
        )} 
        align="end" 
        side={isMobile ? "bottom" : "bottom"} 
        sideOffset={8}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="font-medium text-white">Quick Actions</h3>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
              {activeAgent?.name}
            </Badge>
          </div>
          
          <div className={cn("grid gap-2", isMobile ? "grid-cols-1" : "grid-cols-2")}>
            {actions.slice(0, isMobile ? 4 : 6).map((action, index) => {
            const ActionIcon = action.icon;
            return <Button key={index} variant="ghost" size="sm" onClick={() => handleQuickAction(action.prompt)} className={cn("group relative overflow-hidden", "flex items-center gap-3 text-left", "text-white/70 hover:text-white rounded-xl", "border border-transparent hover:border-purple-500/30", "transition-all duration-300 ease-out", "hover:bg-purple-500/10 hover:scale-[1.02]", "active:scale-[0.98] active:transition-transform active:duration-100", isMobile ? "h-12 py-2 px-3 justify-start" : "h-auto py-3 px-3 flex-col")}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                  
                  {isMobile ? <>
                      <ActionIcon className="w-4 h-4 flex-shrink-0 relative z-10 transition-transform duration-300 ease-out group-hover:scale-110" />
                      <span className="text-sm font-medium relative z-10 transition-all duration-300 ease-out">
                        {action.label}
                      </span>
                    </> : <>
                      <ActionIcon className="w-4 h-4 flex-shrink-0 relative z-10 transition-transform duration-300 ease-out group-hover:scale-110" />
                      <span className="leading-tight text-center font-medium relative z-10 transition-all duration-300 ease-out text-xs">
                        {action.label}
                      </span>
                    </>}
                </Button>;
          })}
          </div>

          {actions.length > (isMobile ? 4 : 6) && <div className="text-center pt-2 border-t border-white/10">
              <span className="text-xs text-white/50">
                +{actions.length - (isMobile ? 4 : 6)} more available
              </span>
            </div>}
        </div>
      </PopoverContent>
    </Popover>;
};
