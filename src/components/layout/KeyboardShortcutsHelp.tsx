
import React from 'react';

export const KeyboardShortcutsHelp: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 text-xs text-white/30 font-light hidden lg:block">
      <div className="space-y-1">
        <div>Ctrl+F: Search • Ctrl+N: New Chat</div>
        <div>Ctrl+B: Toggle Sidebar • /: Focus Input</div>
      </div>
    </div>
  );
};
