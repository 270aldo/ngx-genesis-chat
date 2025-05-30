
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  Trash2, 
  User,
  ChevronLeft,
  Brain,
  TrendingUp,
  Menu,
  Activity
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    conversations,
    currentConversationId,
    sidebarOpen,
    createConversation,
    setCurrentConversation,
    deleteConversation,
    toggleSidebar,
  } = useChatStore();
  
  const isMobile = useIsMobile();

  const handleNewConversation = () => {
    createConversation();
    // Auto-close sidebar on mobile after creating conversation
    if (isMobile) {
      toggleSidebar();
    }
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    // Auto-close sidebar on mobile after selecting conversation
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={cn(
        'h-full bg-slate-900 border-r border-slate-700 transition-all duration-300 ease-in-out flex flex-col fixed left-0 top-0 z-50',
        isMobile ? (
          sidebarOpen ? 'w-80' : 'w-0 -translate-x-full'
        ) : (
          sidebarOpen ? 'w-80' : 'w-16'
        )
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-900">
        <div className="flex items-center justify-between">
          {(sidebarOpen || !isMobile) && (
            <div className={cn("flex items-center gap-3", !sidebarOpen && !isMobile && "hidden")}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-navy-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-sm text-white">NGX Agents</h1>
                <p className="text-xs text-slate-400">Advanced AI Interface</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 flex-shrink-0"
          >
            {isMobile ? (
              <Menu className="h-4 w-4" />
            ) : (
              <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
            )}
          </Button>
        </div>
      </div>

      {/* New Conversation Button */}
      <div className="p-3 bg-slate-900">
        <Button
          onClick={handleNewConversation}
          className={cn(
            "w-full bg-purple-600 hover:bg-purple-700 text-white",
            (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
          )}
        >
          <Plus className="h-4 w-4 flex-shrink-0" />
          {(sidebarOpen || isMobile) && <span>New Chat</span>}
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-3 bg-slate-900">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                "hover:bg-slate-800",
                conversation.id === currentConversationId && "bg-slate-800"
              )}
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <MessageSquare className="h-4 w-4 flex-shrink-0 text-slate-400" />
              {(sidebarOpen || isMobile) && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate text-white">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      {conversation.messages.length} messages
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400 hover:bg-slate-700 flex-shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 bg-slate-900">
        <div className="space-y-1">
          <Link to="/dashboard/progress">
            <Button
              variant="ghost"
              className={cn(
                "w-full text-slate-400 hover:text-white hover:bg-slate-800",
                (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
              )}
            >
              <TrendingUp className="h-4 w-4 flex-shrink-0" />
              {(sidebarOpen || isMobile) && <span>Progress Dashboard</span>}
            </Button>
          </Link>
          <Link to="/dashboard/biometrics">
            <Button
              variant="ghost"
              className={cn(
                "w-full text-slate-400 hover:text-white hover:bg-slate-800",
                (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
              )}
            >
              <Activity className="h-4 w-4 flex-shrink-0" />
              {(sidebarOpen || isMobile) && <span>Biometrics Dashboard</span>}
            </Button>
          </Link>
          <Link to="/settings">
            <Button
              variant="ghost"
              className={cn(
                "w-full text-slate-400 hover:text-white hover:bg-slate-800",
                (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
              )}
            >
              <Settings className="h-4 w-4 flex-shrink-0" />
              {(sidebarOpen || isMobile) && <span>Settings</span>}
            </Button>
          </Link>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-slate-400 hover:text-white hover:bg-slate-800",
              (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
            )}
          >
            <User className="h-4 w-4 flex-shrink-0" />
            {(sidebarOpen || isMobile) && <span>Profile</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
