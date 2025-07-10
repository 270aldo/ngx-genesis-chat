
import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { useQuickMessageListener } from '@/hooks/useQuickMessageListener';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowUp, Paperclip, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
  const { isTyping } = useChatStore();
  const { agents, activeAgentId, setActiveAgent, getActiveAgent } = useAgentStore();
  const isMobile = useIsMobile();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const activeAgent = getActiveAgent();

  useQuickMessageListener(onSendMessage);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", isMobile && "px-3")}>
      <div className="bg-black border border-violet-800 rounded-2xl shadow-lg shadow-violet-800/10">
        <div className={cn("p-2", isMobile ? "md:p-2" : "md:p-4")}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isTyping ? "NGX Agent is thinking..." : "Ask me anything..."}
            disabled={disabled || isTyping}
            className="w-full text-base md:text-lg placeholder-gray-400 bg-transparent outline-none resize-none p-2 text-white"
            rows={2}
          />
        </div>
        <div className="flex items-center justify-between mt-2 px-4 pb-3 border-t border-violet-800 pt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 hover:bg-violet-900/50 rounded-lg transition-colors"
              disabled={disabled}
            >
              <Paperclip className="w-5 h-5 text-violet-500" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Popover open={agentDropdownOpen} onOpenChange={setAgentDropdownOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-1 cursor-pointer group px-2 py-1 rounded-lg hover:bg-violet-900/30 transition-colors">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {activeAgent?.name || 'Select Agent'}
                  </span>
                  <ChevronUp className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-0 bg-black border border-violet-800 shadow-lg shadow-violet-800/20" 
                align="end"
                side="top"
                sideOffset={8}
              >
                <div className="p-3">
                  <div className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">Select Agent</div>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {agents.map((agent) => (
                      <div
                        key={agent.id}
                        onClick={() => {
                          setActiveAgent(agent.id);
                          setAgentDropdownOpen(false);
                        }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                          activeAgentId === agent.id 
                            ? "bg-violet-900/50 border border-violet-700" 
                            : "hover:bg-violet-900/30"
                        )}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold"
                          style={{ backgroundColor: agent.accentColor, color: 'white' }}
                        >
                          {agent.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white">{agent.name}</div>
                          <div className="text-xs text-gray-400 truncate">{agent.specialty}</div>
                        </div>
                        {activeAgentId === agent.id && (
                          <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              onClick={handleSubmit}
              disabled={(!input.trim() && !isTyping) || disabled}
              className="p-2.5 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors disabled:opacity-50"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
