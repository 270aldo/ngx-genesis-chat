
import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatSearch } from './ChatSearch';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ChatArea: React.FC = () => {
  const { getCurrentConversation, deleteMessage, updateMessage } = useChatStore();
  const { getActiveAgent } = useAgentStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const conversation = getCurrentConversation();
  const activeAgent = getActiveAgent();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'f') {
          event.preventDefault();
          setIsSearchOpen(true);
        }
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setEditingMessageId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEditMessage = (messageId: string) => {
    setEditingMessageId(messageId);
    // TODO: Implement edit functionality
    toast({
      title: "Edit functionality",
      description: "Message editing will be implemented in the next iteration.",
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    if (conversation) {
      deleteMessage(conversation.id, messageId);
      toast({
        title: "Message deleted",
        description: "The message has been removed from the conversation.",
      });
    }
  };

  // Get quick messages for active agent
  const getQuickMessages = () => {
    if (!activeAgent) return [];

    const agentSpecificMessages = {
      'training-strategist': [
        "Diseña mi rutina de entrenamiento",
        "¿Cómo ganar músculo efectivamente?",
        "Plan de fuerza personalizado",
        "Ejercicios para entrenar en casa"
      ],
      'nutrition-architect': [
        "Calcula mis macros diarios",
        "Plan de comidas saludable",
        "¿Qué suplementos necesito?",
        "Recetas rápidas y nutritivas"
      ],
      'biometrics-engine': [
        "Analiza mis datos de sueño",
        "Interpreta mi HRV",
        "Optimizar mi recuperación",
        "Tendencias de mis métricas"
      ],
      'biohacking-innovator': [
        "Protocolo de frío y calor",
        "Optimizar mi circadiano",
        "Stack de suplementos",
        "Técnicas de biohacking"
      ],
      'motivation-coach': [
        "Construir hábitos duraderos",
        "Superar barreras mentales",
        "Mantener la motivación",
        "Estrategias de disciplina"
      ],
      'progress-tracker': [
        "Analizar mi progreso",
        "Establecer nuevas metas",
        "Comparar mis fotos",
        "Predicción de resultados"
      ],
      'recovery-corrective': [
        "Plan de movilidad",
        "Prevenir lesiones",
        "Optimizar mi sueño",
        "Rutina de recuperación"
      ],
      'success-liaison': [
        "Check-in semanal",
        "Revisar mis objetivos",
        "Celebrar mis logros",
        "Planificar el éxito"
      ],
      'orchestrator': [
        "Crear un plan integral",
        "Coordinar mis objetivos",
        "¿Qué agente necesito?",
        "Análisis completo de fitness"
      ]
    };

    return agentSpecificMessages[activeAgent.id as keyof typeof agentSpecificMessages] || [];
  };

  const handleQuickMessage = (message: string) => {
    // Dispatch a custom event to send the message
    const event = new CustomEvent('quickMessageSelected', {
      detail: { message }
    });
    window.dispatchEvent(event);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center relative overflow-hidden chat-scroll-area">
        <ChatSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full floating-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-8 max-w-2xl mx-auto p-8 relative z-10">
          {/* Main icon with premium effects */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 pulse-ring"></div>
            <div className={cn(
              "relative w-20 h-20 rounded-full glass-premium flex items-center justify-center glow-subtle",
              activeAgent && `bg-gradient-to-br ${activeAgent.color}`
            )}>
              <div className="text-2xl">{activeAgent?.avatar || '🧠'}</div>
            </div>
          </div>

          {/* Title and description */}
          <div className="space-y-4">
            <h1 className="text-4xl font-light tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {activeAgent?.name || 'NGX Agents'}
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
              {activeAgent?.description || 'Experience the future of AI conversation with advanced agent intelligence.'}
            </p>
          </div>

          {/* Search hint */}
          <div className="text-xs text-white/30 font-light">
            Press Ctrl+F to search conversations
          </div>

          {/* Quick Messages - Replace the static suggestions */}
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            {getQuickMessages().map((message, index) => (
              <Button
                key={index}
                onClick={() => handleQuickMessage(message)}
                variant="ghost"
                className="px-6 py-3 text-sm font-medium rounded-full glass-ultra hover:glass-premium transition-all duration-300 border border-white/5 hover:border-white/10 hover:scale-105 shimmer-premium"
              >
                {message}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto relative chat-scroll-area">
      <ChatSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <div className="max-w-5xl mx-auto px-6">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center min-h-full">
            <div className="text-center space-y-6 p-8">
              <div className="text-6xl mb-6 opacity-30">{activeAgent?.avatar || '💭'}</div>
              <h3 className="text-2xl font-light text-white/80">
                Ready to begin with {activeAgent?.name}
              </h3>
              <p className="text-sm text-muted-foreground/60 font-light">
                {activeAgent?.specialty || 'Start a conversation and explore endless possibilities'}
              </p>
              <div className="text-xs text-white/30 font-light mt-4">
                Press Ctrl+F to search conversations
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8">
            {conversation.messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLast={index === conversation.messages.length - 1}
                onEditMessage={handleEditMessage}
                onDeleteMessage={handleDeleteMessage}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};
