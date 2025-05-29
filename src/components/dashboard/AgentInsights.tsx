
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgentStore } from '@/store/agentStore';
import { cn } from '@/lib/utils';

export const AgentInsights: React.FC = () => {
  const { agents } = useAgentStore();

  // Mock insights data - in real app, this would come from actual agent analysis
  const insights = [
    {
      agentId: 'training-strategist',
      title: 'Training Progress',
      insight: 'Your strength has improved 15% this month. Ready for progressive overload.',
      priority: 'high',
      action: 'Increase weights by 5-10%'
    },
    {
      agentId: 'nutrition-architect',
      title: 'Nutrition Alert',
      insight: 'Protein intake below target 3 days this week.',
      priority: 'medium',
      action: 'Add protein shake post-workout'
    },
    {
      agentId: 'biometrics-engine',
      title: 'Recovery Status',
      insight: 'HRV trending down. Consider additional rest day.',
      priority: 'high',
      action: 'Schedule active recovery tomorrow'
    }
  ];

  return (
    <Card className="glass-ultra border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <span className="text-lg">🧠</span>
          Agent Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const agent = agents.find(a => a.id === insight.agentId);
          if (!agent) return null;

          return (
            <div 
              key={index}
              className={cn(
                "p-3 rounded-lg border-l-4",
                insight.priority === 'high' ? 'border-red-400 bg-red-500/10' : 'border-yellow-400 bg-yellow-500/10'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-6 h-6 rounded-md flex items-center justify-center text-xs",
                  `bg-gradient-to-br ${agent.color}`
                )}>
                  <span>{agent.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{insight.title}</p>
                  <p className="text-xs text-white/70 mt-1">{insight.insight}</p>
                  <p className="text-xs text-green-400 mt-2">💡 {insight.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
