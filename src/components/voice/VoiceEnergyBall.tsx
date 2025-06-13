
import React from 'react';
import { useAgentStore } from '@/store/agentStore';
import { cn } from '@/lib/utils';

interface VoiceEnergyBallProps {
  isActive: boolean;
  isSpeaking: boolean;
  className?: string;
}

export const VoiceEnergyBall: React.FC<VoiceEnergyBallProps> = ({
  isActive,
  isSpeaking,
  className
}) => {
  const { getActiveAgent } = useAgentStore();
  const activeAgent = getActiveAgent();
  
  // Colores dinámicos basados en el agente activo
  const getAgentColors = () => {
    if (!activeAgent) return { primary: '#a855f7', secondary: '#9333ea' };
    
    switch (activeAgent.id) {
      case 'nexus':
        return { primary: '#3b82f6', secondary: '#1d4ed8' };
      case 'coach':
        return { primary: '#f59e0b', secondary: '#d97706' };
      case 'nutritionist':
        return { primary: '#10b981', secondary: '#059669' };
      case 'biometrics-engine':
        return { primary: '#ef4444', secondary: '#dc2626' };
      default:
        return { primary: '#a855f7', secondary: '#9333ea' };
    }
  };

  const colors = getAgentColors();

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative w-32 h-32">
        {/* Outer ripple rings */}
        {isActive && (
          <>
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{
                background: `radial-gradient(circle, ${colors.primary}40, transparent 70%)`,
                animationDuration: '2s'
              }}
            />
            <div 
              className="absolute inset-2 rounded-full animate-ping opacity-30"
              style={{
                background: `radial-gradient(circle, ${colors.primary}60, transparent 70%)`,
                animationDuration: '1.5s',
                animationDelay: '0.3s'
              }}
            />
          </>
        )}

        {/* Main energy ball */}
        <div 
          className={cn(
            "absolute inset-4 rounded-full transition-all duration-300",
            "border-2 border-opacity-30",
            isSpeaking ? "animate-pulse" : "",
            isActive ? "shadow-2xl" : "shadow-lg"
          )}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.primary}80, ${colors.secondary}60, ${colors.primary}40)`,
            borderColor: colors.primary,
            boxShadow: isActive 
              ? `0 0 40px ${colors.primary}60, 0 0 80px ${colors.primary}30, inset 0 0 30px ${colors.primary}20`
              : `0 0 20px ${colors.primary}40, inset 0 0 20px ${colors.primary}10`
          }}
        >
          {/* Inner core */}
          <div 
            className="absolute inset-3 rounded-full transition-all duration-200"
            style={{
              background: `radial-gradient(circle at 40% 40%, ${colors.primary}90, ${colors.secondary}70)`,
              boxShadow: `inset 0 0 20px ${colors.primary}30`
            }}
          >
            {/* Core highlight */}
            <div 
              className="absolute top-2 left-2 w-4 h-4 rounded-full opacity-80"
              style={{
                background: `radial-gradient(circle, white, ${colors.primary}60)`,
              }}
            />
          </div>

          {/* Floating particles */}
          {isActive && (
            <>
              <div 
                className="absolute top-1 right-3 w-1 h-1 rounded-full animate-bounce opacity-60"
                style={{ 
                  backgroundColor: colors.primary,
                  animationDelay: '0s',
                  animationDuration: '1.2s'
                }}
              />
              <div 
                className="absolute bottom-2 left-2 w-1 h-1 rounded-full animate-bounce opacity-60"
                style={{ 
                  backgroundColor: colors.primary,
                  animationDelay: '0.4s',
                  animationDuration: '1.4s'
                }}
              />
              <div 
                className="absolute top-4 left-1 w-0.5 h-0.5 rounded-full animate-bounce opacity-40"
                style={{ 
                  backgroundColor: colors.secondary,
                  animationDelay: '0.8s',
                  animationDuration: '1.6s'
                }}
              />
            </>
          )}
        </div>

        {/* Speaking indicator waves */}
        {isSpeaking && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              <div 
                className="w-1 h-8 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: colors.primary,
                  animationDelay: '0ms',
                  animationDuration: '800ms'
                }}
              />
              <div 
                className="w-1 h-12 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: colors.primary,
                  animationDelay: '200ms',
                  animationDuration: '800ms'
                }}
              />
              <div 
                className="w-1 h-8 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: colors.primary,
                  animationDelay: '400ms',
                  animationDuration: '800ms'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
