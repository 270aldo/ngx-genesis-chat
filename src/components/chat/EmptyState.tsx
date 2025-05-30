import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Agent } from '@/types/agent';

interface EmptyStateProps {
  activeAgent?: Agent;
  onQuickMessage: (message: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ activeAgent, onQuickMessage }) => {
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

  const quickMessages = getQuickMessages();

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden chat-scroll-area z-0">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
          <h1 className="text-4xl font-light tracking-tight text-black">
            {activeAgent?.name || 'NGX Agents'}
          </h1>
          <p className="text-lg text-black font-light max-w-md mx-auto leading-relaxed">
            {activeAgent?.description || 'Experience the future of AI conversation with advanced agent intelligence.'}
          </p>
        </div>

        {/* Search hint */}
        <div className="text-xs text-black/50 font-light">
          Press Ctrl+F to search conversations
        </div>

        {/* Quick Messages */}
        <div className="flex flex-wrap gap-3 justify-center mt-12">
          {quickMessages.map((message, index) => (
            <Button
              key={index}
              onClick={() => onQuickMessage(message)}
              variant="ghost"
              className="px-6 py-3 text-sm font-medium rounded-full glass-ultra hover:glass-premium transition-all duration-300 border border-white/5 hover:border-white/10 hover:scale-105 shimmer-premium text-black"
            >
              {message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
