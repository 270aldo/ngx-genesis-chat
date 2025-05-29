
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, BarChart3, Zap, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalConversations: number;
    totalMessages: number;
    tokensUsed: number;
    tokensLimit: number;
  };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const tokensPercentage = (stats.tokensUsed / stats.tokensLimit) * 100;

  const cards = [
    {
      title: 'Total Conversations',
      value: stats.totalConversations,
      icon: MessageSquare,
      description: 'Active chats',
    },
    {
      title: 'Messages Sent',
      value: stats.totalMessages,
      icon: BarChart3,
      description: 'This month',
    },
    {
      title: 'Tokens Used',
      value: `${stats.tokensUsed.toLocaleString()}`,
      icon: Zap,
      description: `of ${stats.tokensLimit.toLocaleString()} limit`,
      progress: tokensPercentage,
    },
    {
      title: 'Efficiency',
      value: '94%',
      icon: TrendingUp,
      description: 'Response accuracy',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="glass-ultra border-white/10 bg-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/60">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
              <p className="text-xs text-white/40">{card.description}</p>
              {card.progress && (
                <div className="mt-3">
                  <Progress 
                    value={card.progress} 
                    className="h-2 bg-white/10"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
