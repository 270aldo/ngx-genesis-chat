
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Volume2, Phone, PhoneOff } from 'lucide-react';
import { useVoiceConversation } from '@/hooks/useVoiceConversation';
import { useAgentStore } from '@/store/agentStore';
import { VoiceEnergyBall } from './VoiceEnergyBall';
import { cn } from '@/lib/utils';

interface VoiceInterfaceProps {
  className?: string;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ className }) => {
  const [volume, setVolume] = useState([0.8]);
  const { getActiveAgent } = useAgentStore();
  const {
    isVoiceActive,
    isSpeaking,
    status,
    startVoiceConversation,
    endVoiceConversation,
    setVolume: setAudioVolume
  } = useVoiceConversation();

  const activeAgent = getActiveAgent();

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    setAudioVolume(value[0]);
  };

  const handleToggleVoice = () => {
    if (isVoiceActive) {
      endVoiceConversation();
    } else {
      startVoiceConversation(activeAgent?.id);
    }
  };

  return (
    <Card className={cn(
      "glass-ultra border-purple-500/20 p-6 space-y-6",
      className
    )}>
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
          )} />
          <span className="text-sm font-medium text-white/90">
            Voice Chat {status === 'connected' ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        <Button
          onClick={handleToggleVoice}
          size="sm"
          className={cn(
            "transition-all duration-300",
            isVoiceActive 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "bg-purple-600 hover:bg-purple-700 text-white"
          )}
        >
          {isVoiceActive ? (
            <>
              <PhoneOff className="w-4 h-4 mr-2" />
              End Call
            </>
          ) : (
            <>
              <Phone className="w-4 h-4 mr-2" />
              Start Voice Chat
            </>
          )}
        </Button>
      </div>

      {/* Energy Ball Display */}
      <div className="flex flex-col items-center py-8">
        <VoiceEnergyBall 
          isActive={isVoiceActive}
          isSpeaking={isSpeaking}
          className="mb-6"
        />
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white">
            {activeAgent?.name || 'NGX Agent'}
          </h3>
          <p className="text-sm text-white/70">
            {!isVoiceActive ? (
              'Ready for voice conversation'
            ) : isSpeaking ? (
              `${activeAgent?.name} is speaking...`
            ) : (
              'Listening... Speak naturally'
            )}
          </p>
        </div>
      </div>

      {/* Voice Controls */}
      {isVoiceActive && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-white/60" />
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={1}
              min={0}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs text-white/60 w-10">
              {Math.round(volume[0] * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Getting Started Info */}
      {!isVoiceActive && (
        <div className="text-center py-4 space-y-3">
          <p className="text-sm text-white/60">
            Experience natural voice conversations with {activeAgent?.name}
          </p>
          <p className="text-xs text-white/40">
            Click "Start Voice Chat" to begin speaking with your AI agent
          </p>
        </div>
      )}
    </Card>
  );
};
