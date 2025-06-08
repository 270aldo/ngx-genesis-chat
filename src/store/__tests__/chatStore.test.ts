import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from '../chatStore';

beforeEach(() => {
  useChatStore.setState({
    conversations: [],
    activeConversationId: null,
    sidebarOpen: true,
    isVoiceMode: false,
    isTyping: false,
  });
  localStorage.clear();
});

describe('chatStore', () => {
  it('creates a conversation and sets it active', () => {
    const id = useChatStore.getState().createConversation();
    const state = useChatStore.getState();
    expect(state.activeConversationId).toBe(id);
    expect(state.conversations).toHaveLength(1);
  });

  it('adds a message to a conversation', () => {
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
});
