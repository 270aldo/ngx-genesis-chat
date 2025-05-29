import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';
import { useAgentStore } from './agentStore';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isTyping?: boolean;
  agentId?: string;
  metadata?: {
    confidence?: number;
    processingTime?: number;
    tokens?: number;
    agentName?: string;
    agentAvatar?: string;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  agentId?: string;
}

interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  isTyping: boolean;
  isVoiceMode: boolean;
  sidebarOpen: boolean;
  
  // Actions
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  setCurrentConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  setTyping: (isTyping: boolean) => void;
  setVoiceMode: (isVoiceMode: boolean) => void;
  toggleSidebar: () => void;
  getCurrentConversation: () => Conversation | null;
  canSendMessage: () => boolean;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      isTyping: false,
      isVoiceMode: false,
      sidebarOpen: true,

      createConversation: () => {
        const { getActiveAgent } = useAgentStore.getState();
        const activeAgent = getActiveAgent();
        
        const id = crypto.randomUUID();
        const newConversation: Conversation = {
          id,
          title: `New Chat with ${activeAgent?.name || 'NGX Agent'}`,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          agentId: activeAgent?.id
        };

        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: id,
        }));

        return id;
      },

      deleteConversation: (id: string) => {
        set((state) => ({
          conversations: state.conversations.filter((conv) => conv.id !== id),
          currentConversationId: 
            state.currentConversationId === id ? null : state.currentConversationId,
        }));
      },

      setCurrentConversation: (id: string) => {
        set({ currentConversationId: id });
      },

      addMessage: (conversationId: string, message) => {
        // Check if user has tokens for user messages
        if (message.role === 'user') {
          const { useTokens } = useAuthStore.getState();
          const hasTokens = useTokens(1); // Cost 1 token per message
          
          if (!hasTokens) {
            throw new Error('Insufficient tokens to send message');
          }
        }

        const { getAgent } = useAgentStore.getState();
        const agent = message.agentId ? getAgent(message.agentId) : null;

        const newMessage: Message = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
          metadata: {
            ...message.metadata,
            agentName: agent?.name,
            agentAvatar: agent?.avatar
          }
        };

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  updatedAt: new Date(),
                  title: conv.messages.length === 0 && message.role === 'user' 
                    ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
                    : conv.title,
                }
              : conv
          ),
        }));
      },

      updateMessage: (conversationId: string, messageId: string, updates) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, ...updates } : msg
                  ),
                  updatedAt: new Date(),
                }
              : conv
          ),
        }));
      },

      deleteMessage: (conversationId: string, messageId: string) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.filter((msg) => msg.id !== messageId),
                  updatedAt: new Date(),
                }
              : conv
          ),
        }));
      },

      setTyping: (isTyping: boolean) => {
        set({ isTyping });
      },

      setVoiceMode: (isVoiceMode: boolean) => {
        set({ isVoiceMode });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      getCurrentConversation: () => {
        const state = get();
        return state.conversations.find((conv) => conv.id === state.currentConversationId) || null;
      },

      canSendMessage: () => {
        const { getTokens } = useAuthStore.getState();
        return getTokens() > 0;
      },
    }),
    {
      name: 'ngx-agents-chat',
      partialize: (state) => ({
        conversations: state.conversations,
        currentConversationId: state.currentConversationId,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
