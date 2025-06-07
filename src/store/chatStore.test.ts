import { useChatStore } from './chatStore';

const resetChatStore = () => {
  useChatStore.setState({
    conversations: [],
    activeConversationId: null,
    sidebarOpen: true,
    isVoiceMode: false,
    isTyping: false,
  });
  window.localStorage.clear();
};

beforeEach(() => {
  resetChatStore();
});

describe('chat store actions', () => {
  test('createConversation sets active conversation', () => {
    const id = useChatStore.getState().createConversation();
    const state = useChatStore.getState();
    expect(state.conversations).toHaveLength(1);
    expect(state.activeConversationId).toBe(id);
  });

  test('addMessage adds message to conversation', () => {
    const convId = useChatStore.getState().createConversation();
    const msgId = useChatStore.getState().addMessage(convId, {
      content: 'hello',
      role: 'user',
    });
    const conv = useChatStore
      .getState()
      .conversations.find((c) => c.id === convId)!;
    expect(conv.messages).toHaveLength(1);
    expect(conv.messages[0].id).toBe(msgId);
    expect(conv.messages[0].content).toBe('hello');
  });

  test('toggleSidebar flips sidebarOpen', () => {
    const initial = useChatStore.getState().sidebarOpen;
    useChatStore.getState().toggleSidebar();
    expect(useChatStore.getState().sidebarOpen).toBe(!initial);
  });
});
