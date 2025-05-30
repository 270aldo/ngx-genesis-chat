
import React from 'react';
import { useAgentStore } from '@/store/agentStore';
import { cn } from '@/lib/utils';

export const BiometricsToggle: React.FC = () => {
  const { getActiveAgent } = useAgentStore();
  const activeAgent = getActiveAgent();

  if (activeAgent?.id !== 'biometrics-engine') {
    return null;
  }

  return (
    <button
      className={cn(
        "px-3 py-1 text-xs rounded-full transition-all duration-200",
        "bg-white/10 text-white/60 border border-white/10 hover:bg-white/20"
      )}
    >
      Biometrics
    </button>
  );
};
