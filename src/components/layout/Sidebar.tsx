
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { NewConversationButton } from './sidebar/NewConversationButton';
import { SidebarConversationsList } from './sidebar/SidebarConversationsList';
import { SidebarFooter } from './sidebar/SidebarFooter';

interface SidebarProps {
  showBiometrics: boolean;
  setShowBiometrics: (show: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ showBiometrics, setShowBiometrics }) => {
  const { sidebarOpen } = useChatStore();
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col',
        isMobile ? (
          sidebarOpen ? 'w-72 absolute left-0 top-0 z-50' : 'w-0'
        ) : (
          sidebarOpen ? 'w-80' : 'w-16'
        )
      )}
    >
      <SidebarHeader />
      <NewConversationButton />
      <SidebarConversationsList />
      <SidebarFooter 
        showBiometrics={showBiometrics}
        setShowBiometrics={setShowBiometrics}
      />
    </div>
  );
};
