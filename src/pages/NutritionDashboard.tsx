
import React from 'react';
import { NutritionOverview } from '@/components/nutrition/NutritionOverview';

const NutritionDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <NutritionOverview />
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;
