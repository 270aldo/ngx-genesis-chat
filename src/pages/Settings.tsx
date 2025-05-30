
import React, { useState } from 'react';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { ChatSettings } from '@/components/settings/ChatSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { Button } from '@/components/ui/button';
import { User, Palette, MessageSquare, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

type SettingsTab = 'profile' | 'appearance' | 'chat' | 'security';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const isMobile = useIsMobile();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'security', label: 'Security', icon: Shield },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'chat':
        return <ChatSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] [background-size:20px_20px] opacity-20"></div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className={`font-light text-white mb-2 ${
              isMobile ? 'text-2xl sm:text-3xl' : 'text-4xl'
            }`}>Settings</h1>
            <p className={`text-white/60 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>Manage your account and preferences</p>
          </div>
        </div>

        {/* Settings Layout */}
        {isMobile ? (
          // Mobile: Stack everything vertically
          <div className="space-y-6">
            {/* Mobile Tab Selector */}
            <div className="glass-ultra border border-white/10 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Content */}
            <div className="glass-ultra border border-white/10 rounded-2xl p-4 sm:p-6">
              {renderTabContent()}
            </div>
          </div>
        ) : (
          // Desktop/Tablet: Grid layout
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-ultra border border-white/10 rounded-2xl p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="glass-ultra border border-white/10 rounded-2xl p-8">
                {renderTabContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
