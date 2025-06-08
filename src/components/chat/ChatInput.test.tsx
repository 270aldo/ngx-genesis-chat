import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from './ChatInput';
import { useChatStore } from '@/store/chatStore';

beforeEach(() => {
  useChatStore.setState({
    conversations: [],
    activeConversationId: null,
    sidebarOpen: true,
    isVoiceMode: false,
    isTyping: false,
  });
});

describe('ChatInput', () => {
  it('calls onSendMessage when submitting', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<ChatInput onSendMessage={handler} />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'hello');
    await user.keyboard('{Enter}');
    expect(handler).toHaveBeenCalledWith('hello');
    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });
});
