
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrainingOverview } from '@/components/training/TrainingOverview';

const TrainingDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background effects - Updated to match violet theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Header with back button */}
      <div className="border-b border-purple-500/20 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/chat/training-strategist">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white/80 hover:bg-purple-500/10">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-white">Training Dashboard</h1>
                <p className="text-sm text-white/60">Manage your training plans and track workouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <TrainingOverview />
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;
