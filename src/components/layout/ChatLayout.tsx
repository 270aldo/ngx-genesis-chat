
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatHeader } from './ChatHeader';
import { ChatMainContent } from './ChatMainContent';
import { ChatFooter } from './ChatFooter';
import { KeyboardShortcutsHelp } from './KeyboardShortcutsHelp';
import { useChatMessageHandlers } from './ChatMessageHandlers';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatShortcuts } from '@/hooks/useKeyboardShortcuts';
import { toastSuccess } from '@/components/ui/enhanced-toast';
import { cn } from '@/lib/utils';

export const ChatLayout: React.FC = () => {
  const {
    createConversation,
    sidebarOpen,
    toggleSidebar,
  } = useChatStore();
  
  const { activeAgentId } = useAgentStore();
  const isMobile = useIsMobile();
  const [showBiometrics, setShowBiometrics] = useState(false);
  const { handleSendMessage } = useChatMessageHandlers();

  // Hide biometrics dashboard when agent changes (unless it's biometrics-engine)
  React.useEffect(() => {
    if (activeAgentId && activeAgentId !== 'biometrics-engine') {
      setShowBiometrics(false);
    }
  }, [activeAgentId]);

  // Keyboard shortcuts
  useChatShortcuts({
    onSearch: () => {},
    onNewChat: () => {
      createConversation();
      toastSuccess('New conversation created');
    },
    onToggleSidebar: () => toggleSidebar(),
    onFocusInput: () => {
      const input = document.querySelector('textarea');
      input?.focus();
    }
  });

  // Auto-collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile && sidebarOpen) {
      toggleSidebar();
    }
  }, [isMobile, sidebarOpen, toggleSidebar]);

  const onSendMessage = async (content: string) => {
    const shouldShowBiometrics = await handleSendMessage(content);
    if (shouldShowBiometrics) {
      setShowBiometrics(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background effects - Exact same as TrainingDashboard */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="h-screen flex relative z-10">
        {/* Mobile Overlay for Sidebar */}
        {isMobile && sidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Sidebar */}
        <div className={cn(
          "relative z-50",
          isMobile && !sidebarOpen && "hidden"
        )}>
          <Sidebar 
            showBiometrics={showBiometrics}
            setShowBiometrics={setShowBiometrics}
          />
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <ChatHeader 
            showBiometrics={showBiometrics}
            setShowBiometrics={setShowBiometrics}
          />
          
          {/* Chat Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <ChatMainContent showBiometrics={showBiometrics} />
            {!showBiometrics && <ChatFooter onSendMessage={onSendMessage} />}
          </div>
        </div>

        <KeyboardShortcutsHelp />
      </div>
    </div>
  );
};
