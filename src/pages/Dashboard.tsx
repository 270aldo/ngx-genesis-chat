
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProfileSection } from '@/components/dashboard/ProfileSection';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { TokenBalance } from '@/components/tokens/TokenBalance';
import { AgentInsights } from '@/components/dashboard/AgentInsights';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Download, Share2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { conversations } = useChatStore();
  const isMobile = useIsMobile();

  // Mock stats for now - will be real data when Supabase is connected
  const stats = {
    totalConversations: conversations.length,
    totalMessages: conversations.reduce((acc, conv) => acc + conv.messages.length, 0),
    tokensUsed: 12500,
    tokensLimit: 50000,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-white/60">Welcome back, {user?.name || 'User'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/dashboard/progress">
                <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/5">
                  <Calendar className="h-4 w-4 mr-2" />
                  Progress
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link to="/settings">
                <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/5">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <StatsCards stats={stats} />
            <RecentActivity conversations={conversations.slice(0, 5)} />
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            <TokenBalance />
            <AgentInsights />
            <ProfileSection user={user} />
            <QuickActions />
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{conversations.length}</div>
              <div className="text-sm text-white/60">Total Chats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user?.tokens || 0}</div>
              <div className="text-sm text-white/60">Available Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-white/60">Days Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">94%</div>
              <div className="text-sm text-white/60">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
