
export const analyzeUserIntent = (message: string): string[] => {
  const keywords = {
    'training-strategist': ['workout', 'exercise', 'training', 'gym', 'strength', 'cardio', 'plan'],
    'nutrition-architect': ['food', 'eat', 'nutrition', 'diet', 'calories', 'macro', 'meal'],
    'biometrics-engine': ['sleep', 'heart rate', 'hrv', 'recovery', 'stress', 'data'],
    'motivation-coach': ['motivation', 'habit', 'goal', 'stuck', 'barrier', 'mindset'],
    'progress-tracker': ['progress', 'track', 'measure', 'goal', 'achievement', 'result'],
    'recovery-corrective': ['recovery', 'injury', 'pain', 'mobility', 'stretch', 'rest'],
    'biohacking-innovator': ['biohack', 'optimize', 'supplement', 'cold', 'breathe', 'fast']
  };

  const relevantAgents: string[] = [];
  const lowerMessage = message.toLowerCase();

  Object.entries(keywords).forEach(([agentId, agentKeywords]) => {
    if (agentKeywords.some(keyword => lowerMessage.includes(keyword))) {
      relevantAgents.push(agentId);
    }
  });

  return relevantAgents.length > 0 ? relevantAgents : ['orchestrator'];
};
