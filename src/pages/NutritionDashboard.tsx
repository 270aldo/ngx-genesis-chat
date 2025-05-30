
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NutritionOverview } from '@/components/nutrition/NutritionOverview';

const NutritionDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 pointer-events-none"></div>
      
      {/* Header with back button */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/chat/nutrition-guide">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white/80">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-white">Nutrition Dashboard</h1>
                <p className="text-sm text-white/60">Manage your nutrition plans and track progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <NutritionOverview />
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;
