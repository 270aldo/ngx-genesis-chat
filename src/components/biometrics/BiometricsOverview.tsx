
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Heart, Activity, Moon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock biometric data
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
  className?: string;
}> = ({ title, value, unit, icon, trend, className }) => {
  return (
    <Card className={cn("glass-ultra border-white/10", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
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
  const latestData = mockData[mockData.length - 1];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="HRV"
          value={latestData.hrv}
          unit="ms"
          icon={<Activity className="w-4 h-4" />}
          trend="up"
        />
        <MetricCard
          title="Resting HR"
          value={latestData.rhr}
          unit="bpm"
          icon={<Heart className="w-4 h-4" />}
          trend="down"
        />
        <MetricCard
          title="Sleep Quality"
          value={latestData.sleep}
          unit="hrs"
          icon={<Moon className="w-4 h-4" />}
          trend="up"
        />
        <MetricCard
          title="Energy Level"
          value={latestData.energy}
          unit="%"
          icon={<Zap className="w-4 h-4" />}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HRV Trend */}
        <Card className="glass-ultra border-white/10">
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
        <Card className="glass-ultra border-white/10">
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
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
