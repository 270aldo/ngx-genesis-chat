
import React from 'react';
import { ArrowLeft, Download, Share2, Heart, Activity, Moon, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BiometricsOverview } from '@/components/biometrics/BiometricsOverview';

const BiometricsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/chat/biometrics-engine">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white/80">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-white">Biometrics Dashboard</h1>
                <p className="text-sm text-white/60">Real-time health and performance metrics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/5">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BiometricsOverview />

        {/* Additional Stats Footer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-white/60">Data Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-sm text-white/60">Days Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">+5%</div>
              <div className="text-sm text-white/60">HRV Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8.2h</div>
              <div className="text-sm text-white/60">Avg Sleep</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricsDashboard;
