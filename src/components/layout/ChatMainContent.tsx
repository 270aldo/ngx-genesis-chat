
import React from 'react';
import { ChatArea } from '../chat/ChatArea';
import { BiometricsOverview } from '../biometrics/BiometricsOverview';
import { useAgentStore } from '@/store/agentStore';

interface ChatMainContentProps {
  showBiometrics: boolean;
}

export const ChatMainContent: React.FC<ChatMainContentProps> = ({ showBiometrics }) => {
  const { getActiveAgent } = useAgentStore();
  const activeAgent = getActiveAgent();

  if (showBiometrics && activeAgent?.id === 'biometrics-engine') {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-light text-white/90 mb-2">Biometrics Dashboard</h2>
            <p className="text-white/60 text-sm">Real-time health and performance metrics</p>
          </div>
          <BiometricsOverview />
        </div>
      </div>
    );
  }

  return <ChatArea />;
};
