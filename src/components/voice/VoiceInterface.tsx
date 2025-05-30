
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, Phone, PhoneOff } from 'lucide-react';
import { useVoiceConversation } from '@/hooks/useVoiceConversation';
import { useAgentStore } from '@/store/agentStore';
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
      "glass-ultra border-purple-500/20 p-4 space-y-4",
      className
    )}>
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

      {isVoiceActive && (
        <>
          <div className="flex items-center justify-center py-6">
            <div className={cn(
              "relative flex items-center justify-center",
              "w-20 h-20 rounded-full transition-all duration-300",
              "bg-gradient-to-br from-purple-500/20 to-violet-600/20",
              "border-2 border-purple-500/30",
              isSpeaking && "animate-pulse border-purple-400 shadow-lg shadow-purple-500/30"
            )}>
              {isSpeaking ? (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-6 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-8 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-6 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <Mic className="w-8 h-8 text-purple-400" />
              )}
            </div>
          </div>

          <div className="space-y-3">
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

            <div className="text-center">
              <p className="text-sm text-white/70">
                {isSpeaking 
                  ? `${activeAgent?.name} is speaking...` 
                  : 'Listening... Speak naturally'
                }
              </p>
            </div>
          </div>
        </>
      )}

      {!isVoiceActive && (
        <div className="text-center py-4">
          <p className="text-sm text-white/60 mb-2">
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
