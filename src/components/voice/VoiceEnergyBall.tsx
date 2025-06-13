
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
  
  // Ultra-modern color system with holographic gradients
  const getAgentColors = () => {
    if (!activeAgent) return { 
      primary: '#8b5cf6', 
      secondary: '#a855f7', 
      accent: '#c084fc',
      glow: '#ddd6fe'
    };
    
    switch (activeAgent.id) {
      case 'nexus':
        return { 
          primary: '#3b82f6', 
          secondary: '#1e40af', 
          accent: '#60a5fa',
          glow: '#bfdbfe'
        };
      case 'blaze':
        return { 
          primary: '#f59e0b', 
          secondary: '#d97706', 
          accent: '#fbbf24',
          glow: '#fef3c7'
        };
      case 'sage':
        return { 
          primary: '#10b981', 
          secondary: '#059669', 
          accent: '#34d399',
          glow: '#d1fae5'
        };
      case 'wave':
        return { 
          primary: '#ef4444', 
          secondary: '#dc2626', 
          accent: '#f87171',
          glow: '#fee2e2'
        };
      case 'luna':
        return { 
          primary: '#ec4899', 
          secondary: '#db2777', 
          accent: '#f472b6',
          glow: '#fce7f3'
        };
      case 'spark':
        return { 
          primary: '#8b5cf6', 
          secondary: '#7c3aed', 
          accent: '#a78bfa',
          glow: '#ede9fe'
        };
      case 'stella':
        return { 
          primary: '#06b6d4', 
          secondary: '#0891b2', 
          accent: '#22d3ee',
          glow: '#cffafe'
        };
      case 'nova':
        return { 
          primary: '#f97316', 
          secondary: '#ea580c', 
          accent: '#fb923c',
          glow: '#fed7aa'
        };
      case 'codex':
        return { 
          primary: '#6366f1', 
          secondary: '#4f46e5', 
          accent: '#818cf8',
          glow: '#e0e7ff'
        };
      default:
        return { 
          primary: '#8b5cf6', 
          secondary: '#a855f7', 
          accent: '#c084fc',
          glow: '#ddd6fe'
        };
    }
  };

  const colors = getAgentColors();

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative w-40 h-40">
        {/* Outer Energy Field */}
        {isActive && (
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-30 energy-field-pulse"
            style={{
              background: `radial-gradient(circle, ${colors.primary}40, ${colors.accent}20, transparent 70%)`,
            }}
          />
        )}

        {/* Secondary Ripple Rings */}
        {isActive && (
          <>
            <div 
              className="absolute inset-2 rounded-full border opacity-20 energy-ripple-1"
              style={{
                borderColor: colors.accent,
                boxShadow: `0 0 30px ${colors.accent}30`
              }}
            />
            <div 
              className="absolute inset-4 rounded-full border opacity-30 energy-ripple-2"
              style={{
                borderColor: colors.primary,
                boxShadow: `0 0 20px ${colors.primary}40`
              }}
            />
          </>
        )}

        {/* Main Energy Core */}
        <div 
          className={cn(
            "absolute inset-6 rounded-full transition-all duration-500 energy-core",
            isSpeaking ? "energy-core-speaking" : "",
            isActive ? "energy-core-active" : "energy-core-idle"
          )}
          style={{
            background: `
              radial-gradient(circle at 30% 30%, ${colors.primary}95, ${colors.secondary}80, ${colors.primary}60),
              linear-gradient(135deg, ${colors.accent}40, transparent 50%, ${colors.primary}30)
            `,
            border: `2px solid ${colors.primary}60`,
            boxShadow: isActive 
              ? `
                0 0 60px ${colors.primary}50, 
                0 0 120px ${colors.primary}20, 
                inset 0 0 40px ${colors.primary}30,
                inset 0 0 80px ${colors.accent}20
              `
              : `
                0 0 30px ${colors.primary}30, 
                inset 0 0 30px ${colors.primary}15
              `
          }}
        >
          {/* Inner Core with Glassmorphism */}
          <div 
            className="absolute inset-3 rounded-full backdrop-blur-sm transition-all duration-300"
            style={{
              background: `
                radial-gradient(circle at 40% 40%, ${colors.primary}90, ${colors.secondary}70, ${colors.primary}50),
                linear-gradient(45deg, ${colors.accent}30, transparent 60%)
              `,
              border: `1px solid ${colors.accent}30`,
              boxShadow: `
                inset 0 0 30px ${colors.primary}40,
                inset 0 0 60px ${colors.accent}20
              `
            }}
          >
            {/* Holographic Highlight */}
            <div 
              className="absolute top-2 left-2 w-6 h-6 rounded-full opacity-80 energy-highlight"
              style={{
                background: `
                  radial-gradient(circle, 
                    rgba(255,255,255,0.9) 0%, 
                    ${colors.accent}60 40%, 
                    transparent 70%
                  )
                `,
              }}
            />
            
            {/* Secondary Highlight */}
            <div 
              className="absolute bottom-3 right-3 w-3 h-3 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, ${colors.glow}, ${colors.accent}70)`,
              }}
            />
          </div>

          {/* Floating Energy Particles */}
          {isActive && (
            <>
              <div 
                className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full energy-particle-1"
                style={{ 
                  backgroundColor: colors.accent,
                  boxShadow: `0 0 8px ${colors.accent}`
                }}
              />
              <div 
                className="absolute bottom-3 left-3 w-1 h-1 rounded-full energy-particle-2"
                style={{ 
                  backgroundColor: colors.primary,
                  boxShadow: `0 0 6px ${colors.primary}`
                }}
              />
              <div 
                className="absolute top-6 left-2 w-0.5 h-0.5 rounded-full energy-particle-3"
                style={{ 
                  backgroundColor: colors.glow,
                  boxShadow: `0 0 4px ${colors.glow}`
                }}
              />
              <div 
                className="absolute bottom-6 right-2 w-1 h-1 rounded-full energy-particle-4"
                style={{ 
                  backgroundColor: colors.accent,
                  boxShadow: `0 0 6px ${colors.accent}`
                }}
              />
            </>
          )}
        </div>

        {/* Speaking Wave Visualizer */}
        {isSpeaking && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="voice-wave-bar rounded-full"
                  style={{ 
                    backgroundColor: colors.primary,
                    width: '2px',
                    animationDelay: `${i * 150}ms`,
                    filter: `drop-shadow(0 0 4px ${colors.primary})`
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Energy Trails */}
        {isSpeaking && (
          <>
            <div 
              className="absolute inset-0 rounded-full border-2 opacity-40 energy-trail-1"
              style={{
                borderColor: colors.accent,
                borderStyle: 'dashed',
                borderWidth: '1px'
              }}
            />
            <div 
              className="absolute inset-8 rounded-full border opacity-60 energy-trail-2"
              style={{
                borderColor: colors.primary,
                borderStyle: 'dotted'
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
