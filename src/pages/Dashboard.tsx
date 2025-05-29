
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProfileSection } from '@/components/dashboard/ProfileSection';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] [background-size:20px_20px] opacity-20"></div>

      <div className="relative z-10 p-4 sm:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-light text-white mb-2">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            Here's what's happening with your NGX Agents today.
          </p>
        </div>

        {/* Main Grid - Responsive Layout */}
        {isMobile ? (
          // Mobile: Stack everything vertically
          <div className="space-y-6">
            <QuickActions />
            <StatsCards stats={stats} />
            <ProfileSection user={user} />
            <RecentActivity conversations={conversations.slice(0, 5)} />
          </div>
        ) : (
          // Desktop/Tablet: Grid layout
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <StatsCards stats={stats} />
              <RecentActivity conversations={conversations.slice(0, 5)} />
            </div>

            {/* Right Column */}
            <div className="space-y-6 lg:space-y-8">
              <ProfileSection user={user} />
              <QuickActions />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
