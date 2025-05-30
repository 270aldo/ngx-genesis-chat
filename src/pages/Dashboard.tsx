
import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { AgentInsights } from '@/components/dashboard/AgentInsights';
import { ProfileSection } from '@/components/dashboard/ProfileSection';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background effects - Consistent violet theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-white/90 mb-2">Dashboard</h1>
            <p className="text-white/60">Your fitness journey overview</p>
          </div>

          {/* Profile Section */}
          <ProfileSection />

          {/* Stats Cards */}
          <StatsCards />

          {/* Quick Actions and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuickActions />
            <RecentActivity />
          </div>

          {/* Agent Insights */}
          <AgentInsights />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
