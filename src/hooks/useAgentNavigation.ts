
import { useNavigate } from 'react-router-dom';
import { useAgentStore } from '@/store/agentStore';

export const useAgentNavigation = () => {
  const navigate = useNavigate();
  const { setActiveAgent } = useAgentStore();

  const navigateToAgent = (agentId: string) => {
    setActiveAgent(agentId);
    navigate(`/chat/${agentId}`);
  };

  return { navigateToAgent };
};
