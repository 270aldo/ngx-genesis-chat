import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgentStore } from '@/store/agentStore';
import { cn } from '@/lib/utils';
export const AgentInsights: React.FC = () => {
  const {
    agents
  } = useAgentStore();

  // Mock insights data - in real app, this would come from actual agent analysis
  const insights = [{
    agentId: 'training-strategist',
    title: 'Training Progress',
    insight: 'Your strength has improved 15% this month. Ready for progressive overload.',
    priority: 'high',
    action: 'Increase weights by 5-10%'
  }, {
    agentId: 'nutrition-architect',
    title: 'Nutrition Alert',
    insight: 'Protein intake below target 3 days this week.',
    priority: 'medium',
    action: 'Add protein shake post-workout'
  }, {
    agentId: 'biometrics-engine',
    title: 'Recovery Status',
    insight: 'HRV trending down. Consider additional rest day.',
    priority: 'high',
    action: 'Schedule active recovery tomorrow'
  }];
  return <Card className="glass-ultra border-white/10 bg-white/5">
      
      
    </Card>;
};