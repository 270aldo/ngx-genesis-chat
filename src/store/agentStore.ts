
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  name: string;
  title: string;
  specialty: string;
  description: string;
  avatar: string;
  color: string;
  accentColor: string;
  icon: string;
  capabilities: string[];
  personality: 'motivational' | 'analytical' | 'empathetic' | 'technical' | 'supportive';
}

export interface AgentMessage {
  agentId: string;
  content: string;
  timestamp: Date;
  type: 'analysis' | 'recommendation' | 'insight' | 'plan' | 'alert';
  data?: any;
}

interface AgentState {
  agents: Agent[];
  activeAgentId: string;
  orchestratorActive: boolean;
  agentHistory: AgentMessage[];
  
  // Actions
  setActiveAgent: (agentId: string) => void;
  toggleOrchestrator: () => void;
  addAgentMessage: (message: AgentMessage) => void;
  getAgent: (id: string) => Agent | undefined;
  getActiveAgent: () => Agent | undefined;
  analyzeUserIntent: (message: string) => string[];
}

const FITNESS_AGENTS: Agent[] = [
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
    personality: 'analytical'
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
    personality: 'motivational'
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
    personality: 'supportive'
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
    personality: 'analytical'
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
    personality: 'empathetic'
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
    personality: 'analytical'
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
    personality: 'technical'
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
    personality: 'technical'
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
    personality: 'supportive'
  }
];

export const useAgentStore = create<AgentState>()(
  persist(
    (set, get) => ({
      agents: FITNESS_AGENTS,
      activeAgentId: 'orchestrator',
      orchestratorActive: true,
      agentHistory: [],

      setActiveAgent: (agentId: string) => {
        set({ activeAgentId: agentId, orchestratorActive: agentId === 'orchestrator' });
      },

      toggleOrchestrator: () => {
        set((state) => ({ orchestratorActive: !state.orchestratorActive }));
      },

      addAgentMessage: (message: AgentMessage) => {
        set((state) => ({
          agentHistory: [...state.agentHistory, message].slice(-100) // Keep last 100 messages
        }));
      },

      getAgent: (id: string) => {
        const state = get();
        return state.agents.find(agent => agent.id === id);
      },

      getActiveAgent: () => {
        const state = get();
        return state.agents.find(agent => agent.id === state.activeAgentId);
      },

      analyzeUserIntent: (message: string) => {
        const keywords = {
          'training-strategist': ['workout', 'exercise', 'training', 'gym', 'strength', 'cardio', 'plan'],
          'nutrition-architect': ['food', 'eat', 'nutrition', 'diet', 'calories', 'macro', 'meal'],
          'biometrics-engine': ['sleep', 'heart rate', 'hrv', 'recovery', 'stress', 'data'],
          'motivation-coach': ['motivation', 'habit', 'goal', 'stuck', 'barrier', 'mindset'],
          'progress-tracker': ['progress', 'track', 'measure', 'goal', 'achievement', 'result'],
          'recovery-corrective': ['recovery', 'injury', 'pain', 'mobility', 'stretch', 'rest'],
          'biohacking-innovator': ['biohack', 'optimize', 'supplement', 'cold', 'breathe', 'fast']
        };

        const relevantAgents: string[] = [];
        const lowerMessage = message.toLowerCase();

        Object.entries(keywords).forEach(([agentId, agentKeywords]) => {
          if (agentKeywords.some(keyword => lowerMessage.includes(keyword))) {
            relevantAgents.push(agentId);
          }
        });

        return relevantAgents.length > 0 ? relevantAgents : ['orchestrator'];
      }
    }),
    {
      name: 'ngx-agents-store',
      partialize: (state) => ({
        activeAgentId: state.activeAgentId,
        orchestratorActive: state.orchestratorActive,
        agentHistory: state.agentHistory.slice(-50) // Persist last 50 messages
      })
    }
  )
);
