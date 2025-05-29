
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  Trash2, 
  User,
  ChevronLeft,
  Brain
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

  const handleNewConversation = () => {
    createConversation();
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
  };

  return (
    <div
      className={cn(
        'h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col',
        sidebarOpen ? 'w-80' : 'w-16'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-navy-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-sm">NGX Agents</h1>
                <p className="text-xs text-sidebar-foreground/60">Advanced AI Interface</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* New Conversation Button */}
      <div className="p-3">
        <Button
          onClick={handleNewConversation}
          className={cn(
            "w-full bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground",
            sidebarOpen ? "justify-start gap-2" : "justify-center px-2"
          )}
        >
          <Plus className="h-4 w-4" />
          {sidebarOpen && <span>New Chat</span>}
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                "hover:bg-sidebar-accent",
                conversation.id === currentConversationId && "bg-sidebar-accent"
              )}
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <MessageSquare className="h-4 w-4 flex-shrink-0 text-sidebar-foreground/60" />
              {sidebarOpen && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate text-sidebar-foreground">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60">
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
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-sidebar-foreground/60 hover:text-red-400"
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
      <div className="p-3 border-t border-sidebar-border">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              sidebarOpen ? "justify-start gap-2" : "justify-center px-2"
            )}
          >
            <Settings className="h-4 w-4" />
            {sidebarOpen && <span>Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              sidebarOpen ? "justify-start gap-2" : "justify-center px-2"
            )}
          >
            <User className="h-4 w-4" />
            {sidebarOpen && <span>Profile</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
