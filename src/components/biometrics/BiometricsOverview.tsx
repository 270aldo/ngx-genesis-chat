
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Heart, Activity, Moon, Zap, Settings, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWearablesStore } from '@/store/wearablesStore';
import { PredictiveAlerts } from '../wearables/PredictiveAlerts';
import { WearableSettings } from '../wearables/WearableSettings';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWearableSync } from '@/hooks/useWearableSync';
import { format } from 'date-fns';

// Mock biometric data enhanced with wearable integration
const mockData = [
  { date: '2024-01-01', hrv: 45, rhr: 58, sleep: 7.2, energy: 78 },
  { date: '2024-01-02', hrv: 48, rhr: 56, sleep: 8.1, energy: 82 },
  { date: '2024-01-03', hrv: 42, rhr: 61, sleep: 6.8, energy: 71 },
  { date: '2024-01-04', hrv: 51, rhr: 55, sleep: 7.9, energy: 85 },
  { date: '2024-01-05', hrv: 46, rhr: 59, sleep: 7.5, energy: 79 },
  { date: '2024-01-06', hrv: 49, rhr: 57, sleep: 8.3, energy: 88 },
  { date: '2024-01-07', hrv: 53, rhr: 54, sleep: 8.0, energy: 90 },
];

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  isLive?: boolean;
  className?: string;
}> = ({ title, value, unit, icon, trend, isLive, className }) => {
  return (
    <Card className={cn("bg-white/5 backdrop-blur-xl border border-purple-500/20", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/80 flex items-center gap-2">
          {title}
          {isLive && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
        </CardTitle>
        <div className="text-white/60">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          {value}<span className="text-sm text-white/60 ml-1">{unit}</span>
        </div>
        <div className={cn(
          "text-xs flex items-center gap-1 mt-1",
          trend === 'up' && "text-green-400",
          trend === 'down' && "text-red-400",
          trend === 'stable' && "text-yellow-400"
        )}>
          <div className={cn(
            "w-1 h-1 rounded-full",
            trend === 'up' && "bg-green-400",
            trend === 'down' && "bg-red-400",
            trend === 'stable' && "bg-yellow-400"
          )} />
          {trend === 'up' ? '+2.3%' : trend === 'down' ? '-1.2%' : '0.0%'} from yesterday
        </div>
      </CardContent>
    </Card>
  );
};

export const BiometricsOverview: React.FC = () => {
  const { 
    biometricReadings, 
    connectedDevices, 
    syncStatus,
    lastSyncTime 
  } = useWearablesStore();
  
  const { manualSync } = useWearableSync();

  const latestData = mockData[mockData.length - 1];
  const hasConnectedDevices = connectedDevices.some(d => d.isConnected);

  // Get latest readings from wearables
  const getLatestReading = (type: string) => {
    const readings = biometricReadings.filter(r => r.type === type);
    return readings.length > 0 ? readings[readings.length - 1] : null;
  };

  const latestHR = getLatestReading('heart_rate');
  const latestHRV = getLatestReading('hrv');
  const latestSleep = getLatestReading('sleep');

  return (
    <div className="space-y-6">
      {/* Header with Wearables Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-white/90 mb-2">Biometrics Dashboard</h2>
          <p className="text-white/60 text-sm">
            {hasConnectedDevices 
              ? `Live data from ${connectedDevices.filter(d => d.isConnected).length} connected device(s)`
              : 'Connect wearables for live health tracking'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {hasConnectedDevices && (
            <Button
              onClick={manualSync}
              disabled={syncStatus === 'syncing'}
              size="sm"
              variant="outline"
              className="border-purple-500/20 text-white/80 hover:bg-purple-500/10"
            >
              {syncStatus === 'syncing' ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Sync
            </Button>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-black border border-white/20 text-white hover:bg-black/80 hover:border-white/40">
                <Settings className="h-4 w-4 mr-2" />
                Wearables
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-black/90 border-purple-500/20 max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Wearable Settings</DialogTitle>
              </DialogHeader>
              <WearableSettings />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sync Status */}
      {lastSyncTime && (
        <div className="text-xs text-white/60 text-center">
          Last sync: {format(lastSyncTime, 'MMM dd, HH:mm')}
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="HRV"
          value={latestHRV?.value ?? latestData.hrv}
          unit="ms"
          icon={<Activity className="w-4 h-4" />}
          trend="up"
          isLive={!!latestHRV}
        />
        <MetricCard
          title="Resting HR"
          value={latestHR?.value ?? latestData.rhr}
          unit="bpm"
          icon={<Heart className="w-4 h-4" />}
          trend="down"
          isLive={!!latestHR}
        />
        <MetricCard
          title="Sleep Quality"
          value={latestSleep?.value ?? latestData.sleep}
          unit="hrs"
          icon={<Moon className="w-4 h-4" />}
          trend="up"
          isLive={!!latestSleep}
        />
        <MetricCard
          title="Energy Level"
          value={latestData.energy}
          unit="%"
          icon={<Zap className="w-4 h-4" />}
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* HRV Trend */}
          <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white/80">Heart Rate Variability</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff20' }}
                  />
                  <YAxis 
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff20' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hrv" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    dot={{ fill: '#a855f7', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sleep Pattern */}
          <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white/80">Sleep & Energy Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff20' }}
                  />
                  <YAxis 
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff20' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sleep" 
                    stackId="1"
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="energy" 
                    stackId="2"
                    stroke="#a855f7" 
                    fill="#a855f7" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Predictive Alerts */}
        <div className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white/80">AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <PredictiveAlerts />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
