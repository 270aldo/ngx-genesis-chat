
import type { Agent } from '@/types/agent';

export const FITNESS_AGENTS: Agent[] = [
  {
    id: 'orchestrator',
    name: 'NGX Orchestrator',
    title: 'AI Coordinator',
    specialty: 'Intent Analysis & Agent Coordination',
    description: 'Your intelligent coordinator that routes conversations to the right specialists',
    avatar: '🧠',
    color: 'from-purple-500 to-indigo-600',
    accentColor: 'purple-500',
    icon: 'Circle',
    capabilities: ['Intent Analysis', 'Agent Routing', 'Context Management', 'Response Synthesis'],
    personality: 'analytical',
    actions: [
      {
        id: 'intent-analysis',
        label: 'Intent Analysis',
        description: 'Analyze your message and route to the best specialist',
        icon: 'Brain',
        category: 'analysis'
      },
      {
        id: 'agent-coordination',
        label: 'Agent Coordination',
        description: 'Coordinate multiple agents for complex requests',
        icon: 'Network',
        category: 'guidance'
      },
      {
        id: 'context-summary',
        label: 'Context Summary',
        description: 'Summarize conversation context and progress',
        icon: 'FileText',
        category: 'analysis'
      }
    ]
  },
  {
    id: 'training-strategist',
    name: 'Elite Training Strategist',
    title: 'Workout Design Expert',
    specialty: 'Personalized Training Programs',
    description: 'Designs custom workout plans and optimizes your training progression',
    avatar: '💪',
    color: 'from-red-500 to-orange-600',
    accentColor: 'red-500',
    icon: 'Target',
    capabilities: ['Workout Plans', 'Periodization', 'Exercise Selection', 'Progressive Overload'],
    personality: 'motivational',
    actions: [
      {
        id: 'workout-plan',
        label: 'Custom Workout',
        description: 'Create a personalized workout plan for your goals',
        icon: 'Dumbbell',
        category: 'plan'
      },
      {
        id: 'exercise-library',
        label: 'Exercise Library',
        description: 'Browse exercises with proper form instructions',
        icon: 'BookOpen',
        category: 'guidance'
      },
      {
        id: 'progression-tracker',
        label: 'Progression Track',
        description: 'Track your strength and performance improvements',
        icon: 'TrendingUp',
        category: 'tracking'
      },
      {
        id: 'form-analysis',
        label: 'Form Check',
        description: 'Analyze exercise form and provide corrections',
        icon: 'Eye',
        category: 'assessment'
      }
    ]
  },
  {
    id: 'nutrition-architect',
    name: 'Precision Nutrition Architect',
    title: 'Nutrition Specialist',
    specialty: 'Meal Planning & Macro Optimization',
    description: 'Creates personalized nutrition plans and analyzes your dietary intake',
    avatar: '🍎',
    color: 'from-green-500 to-emerald-600',
    accentColor: 'green-500',
    icon: 'Leaf',
    capabilities: ['Meal Planning', 'Macro Calculation', 'Food Analysis', 'Supplement Advice'],
    personality: 'supportive',
    actions: [
      {
        id: 'meal-planning',
        label: 'Meal Planning',
        description: 'Create personalized meal plans for your goals',
        icon: 'Utensils',
        category: 'plan'
      },
      {
        id: 'macro-calculator',
        label: 'Macro Calculator',
        description: 'Calculate optimal macronutrient ratios',
        icon: 'Calculator',
        category: 'analysis'
      },
      {
        id: 'food-scanner',
        label: 'Food Analysis',
        description: 'Analyze food photos for nutritional content',
        icon: 'Scan',
        category: 'assessment'
      },
      {
        id: 'supplement-guide',
        label: 'Supplement Guide',
        description: 'Get personalized supplement recommendations',
        icon: 'Pill',
        category: 'guidance'
      }
    ]
  },
  {
    id: 'biometrics-engine',
    name: 'Biometrics Insight Engine',
    title: 'Health Data Analyst',
    specialty: 'Wearable Data Analysis',
    description: 'Analyzes your health metrics and provides actionable insights',
    avatar: '📊',
    color: 'from-blue-500 to-cyan-600',
    accentColor: 'blue-500',
    icon: 'BarChart3',
    capabilities: ['HRV Analysis', 'Sleep Tracking', 'Recovery Monitoring', 'Trend Detection'],
    personality: 'analytical',
    actions: [
      {
        id: 'hrv-analysis',
        label: 'HRV Analysis',
        description: 'Analyze heart rate variability trends',
        icon: 'Heart',
        category: 'analysis'
      },
      {
        id: 'sleep-insights',
        label: 'Sleep Insights',
        description: 'Get detailed sleep quality analysis',
        icon: 'Moon',
        category: 'analysis'
      },
      {
        id: 'recovery-score',
        label: 'Recovery Score',
        description: 'Calculate your daily recovery readiness',
        icon: 'Battery',
        category: 'assessment'
      },
      {
        id: 'data-trends',
        label: 'Data Trends',
        description: 'Identify patterns in your health metrics',
        icon: 'TrendingUp',
        category: 'analysis'
      }
    ]
  },
  {
    id: 'motivation-coach',
    name: 'Motivation Behavior Coach',
    title: 'Mindset Specialist',
    specialty: 'Habit Formation & Psychology',
    description: 'Helps build lasting habits and overcome mental barriers',
    avatar: '🧠',
    color: 'from-yellow-500 to-amber-600',
    accentColor: 'yellow-500',
    icon: 'Lightbulb',
    capabilities: ['Habit Design', 'Motivation Techniques', 'Barrier Removal', 'Goal Setting'],
    personality: 'empathetic',
    actions: [
      {
        id: 'habit-builder',
        label: 'Habit Builder',
        description: 'Design sustainable fitness habits',
        icon: 'Repeat',
        category: 'plan'
      },
      {
        id: 'motivation-boost',
        label: 'Motivation Boost',
        description: 'Get personalized motivational strategies',
        icon: 'Zap',
        category: 'guidance'
      },
      {
        id: 'barrier-analysis',
        label: 'Barrier Analysis',
        description: 'Identify and overcome mental obstacles',
        icon: 'Shield',
        category: 'assessment'
      },
      {
        id: 'goal-setting',
        label: 'Smart Goals',
        description: 'Set realistic and achievable fitness goals',
        icon: 'Target',
        category: 'plan'
      }
    ]
  },
  {
    id: 'progress-tracker',
    name: 'Progress Tracker',
    title: 'Analytics Specialist',
    specialty: 'Performance Monitoring',
    description: 'Tracks your progress and predicts future outcomes',
    avatar: '📈',
    color: 'from-indigo-500 to-purple-600',
    accentColor: 'indigo-500',
    icon: 'TrendingUp',
    capabilities: ['Progress Analysis', 'Prediction Modeling', 'Goal Tracking', 'Achievement Recognition'],
    personality: 'analytical',
    actions: [
      {
        id: 'progress-report',
        label: 'Progress Report',
        description: 'Generate comprehensive progress analysis',
        icon: 'FileBarChart',
        category: 'analysis'
      },
      {
        id: 'photo-comparison',
        label: 'Photo Compare',
        description: 'Compare progress photos over time',
        icon: 'Images',
        category: 'assessment'
      },
      {
        id: 'milestone-tracker',
        label: 'Milestones',
        description: 'Track achievement of fitness milestones',
        icon: 'Flag',
        category: 'tracking'
      },
      {
        id: 'prediction-model',
        label: 'Goal Timeline',
        description: 'Predict when you\'ll reach your goals',
        icon: 'Clock',
        category: 'analysis'
      }
    ]
  },
  {
    id: 'recovery-corrective',
    name: 'Recovery Corrective',
    title: 'Recovery Specialist',
    specialty: 'Injury Prevention & Mobility',
    description: 'Optimizes recovery and prevents injuries through corrective strategies',
    avatar: '🔄',
    color: 'from-teal-500 to-green-600',
    accentColor: 'teal-500',
    icon: 'RotateCcw',
    capabilities: ['Recovery Protocols', 'Mobility Work', 'Injury Prevention', 'Movement Analysis'],
    personality: 'technical',
    actions: [
      {
        id: 'recovery-assessment',
        label: 'Recovery Assessment',
        description: 'Analyze your current recovery status based on sleep, HRV, and fatigue levels',
        icon: 'Activity',
        category: 'assessment'
      },
      {
        id: 'mobility-plan',
        label: 'Mobility Plan',
        description: 'Create a personalized mobility and stretching routine',
        icon: 'Stretch',
        category: 'plan'
      },
      {
        id: 'injury-prevention',
        label: 'Injury Prevention',
        description: 'Identify risk factors and create prevention strategies',
        icon: 'Shield',
        category: 'guidance'
      },
      {
        id: 'sleep-optimization',
        label: 'Sleep Optimization',
        description: 'Optimize your sleep for better recovery',
        icon: 'Moon',
        category: 'guidance'
      },
      {
        id: 'stress-management',
        label: 'Stress Management',
        description: 'Learn techniques to manage physical and mental stress',
        icon: 'Brain',
        category: 'guidance'
      }
    ]
  },
  {
    id: 'biohacking-innovator',
    name: 'Biohacking Innovator',
    title: 'Optimization Expert',
    specialty: 'Advanced Optimization Protocols',
    description: 'Implements cutting-edge biohacking techniques for peak performance',
    avatar: '🧬',
    color: 'from-pink-500 to-rose-600',
    accentColor: 'pink-500',
    icon: 'Zap',
    capabilities: ['Biohacking Protocols', 'Supplement Stacks', 'Cold Therapy', 'Breathwork'],
    personality: 'technical',
    actions: [
      {
        id: 'cold-therapy',
        label: 'Cold Therapy Protocol',
        description: 'Design a progressive cold exposure routine for recovery and resilience',
        icon: 'Snowflake',
        category: 'plan'
      },
      {
        id: 'breathwork-session',
        label: 'Breathwork Session',
        description: 'Learn advanced breathing techniques for performance and recovery',
        icon: 'Wind',
        category: 'guidance'
      },
      {
        id: 'supplement-stack',
        label: 'Supplement Stack',
        description: 'Create a personalized supplement protocol based on your goals',
        icon: 'Pill',
        category: 'plan'
      },
      {
        id: 'fasting-protocol',
        label: 'Intermittent Fasting',
        description: 'Design a safe and effective fasting schedule',
        icon: 'Clock',
        category: 'plan'
      },
      {
        id: 'circadian-optimization',
        label: 'Circadian Rhythm',
        description: 'Optimize your body clock for better sleep and energy',
        icon: 'Sun',
        category: 'guidance'
      },
      {
        id: 'heat-therapy',
        label: 'Heat Therapy',
        description: 'Sauna and heat exposure protocols for health benefits',
        icon: 'Flame',
        category: 'plan'
      }
    ]
  },
  {
    id: 'success-liaison',
    name: 'Client Success Liaison',
    title: 'Experience Specialist',
    specialty: 'User Success & Support',
    description: 'Ensures you have the best possible experience with NGX Agents',
    avatar: '🤝',
    color: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald-500',
    icon: 'Users',
    capabilities: ['Check-ins', 'Success Planning', 'Feedback Analysis', 'Experience Optimization'],
    personality: 'supportive',
    actions: [
      {
        id: 'weekly-checkin',
        label: 'Weekly Check-in',
        description: 'Review your progress and adjust your plan for the upcoming week',
        icon: 'Calendar',
        category: 'tracking'
      },
      {
        id: 'goal-review',
        label: 'Goal Review',
        description: 'Evaluate and refine your fitness goals based on progress',
        icon: 'Target',
        category: 'assessment'
      },
      {
        id: 'motivation-boost',
        label: 'Motivation Boost',
        description: 'Get personalized encouragement and overcome mental barriers',
        icon: 'Heart',
        category: 'guidance'
      },
      {
        id: 'success-planning',
        label: 'Success Planning',
        description: 'Create a comprehensive roadmap for achieving your goals',
        icon: 'Map',
        category: 'plan'
      },
      {
        id: 'habit-tracker',
        label: 'Habit Tracker',
        description: 'Track and optimize your daily wellness habits',
        icon: 'CheckCircle',
        category: 'tracking'
      },
      {
        id: 'celebration',
        label: 'Celebrate Wins',
        description: 'Acknowledge your achievements and plan rewards',
        icon: 'Trophy',
        category: 'guidance'
      }
    ]
  }
];
