
import React from 'react';
import { ChatArea } from '../chat/ChatArea';

interface ChatMainContentProps {
  showBiometrics: boolean;
}

export const ChatMainContent: React.FC<ChatMainContentProps> = ({ showBiometrics }) => {
  return <ChatArea />;
};
