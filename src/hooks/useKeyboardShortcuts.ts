
import { useEffect, useCallback } from 'react';

interface Shortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  shortcuts: Shortcut[];
  enabled?: boolean;
}

export const useKeyboardShortcuts = ({ shortcuts, enabled = true }: UseKeyboardShortcutsProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Don't trigger shortcuts when typing in inputs, textareas, or contenteditable elements
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      return;
    }

    shortcuts.forEach(shortcut => {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = !!shortcut.ctrlKey === (event.ctrlKey || event.metaKey);
      const shiftMatch = !!shortcut.shiftKey === event.shiftKey;

      if (keyMatch && ctrlMatch && shiftMatch) {
        event.preventDefault();
        shortcut.action();
      }
    });
  }, [shortcuts, enabled]);

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, enabled]);

  return { shortcuts };
};

// Common shortcuts hook
export const useChatShortcuts = (actions: {
  onSearch?: () => void;
  onNewChat?: () => void;
  onToggleSidebar?: () => void;
  onFocusInput?: () => void;
}) => {
  const shortcuts: Shortcut[] = [
    {
      key: 'f',
      ctrlKey: true,
      action: actions.onSearch || (() => {}),
      description: 'Search conversations'
    },
    {
      key: 'n',
      ctrlKey: true,
      action: actions.onNewChat || (() => {}),
      description: 'New conversation'
    },
    {
      key: 'b',
      ctrlKey: true,
      action: actions.onToggleSidebar || (() => {}),
      description: 'Toggle sidebar'
    },
    {
      key: '/',
      action: actions.onFocusInput || (() => {}),
      description: 'Focus message input'
    }
  ];

  return useKeyboardShortcuts({ shortcuts });
};
