import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

describe('InputField', () => {
  test('shows thinking placeholder when typing', () => {
    render(
      <InputField
        input=""
        setInput={() => {}}
        isFocused={false}
        setIsFocused={() => {}}
        textareaRef={{ current: null }}
        handleKeyPress={() => {}}
        isTyping={true}
      />
    );
    const textarea = screen.getByPlaceholderText('NGX Agent is thinking...');
    expect(textarea).toBeDisabled();
  });

  test('updates input on change', () => {
    const setInput = jest.fn();
    render(
      <InputField
        input=""
        setInput={setInput}
        isFocused={false}
        setIsFocused={() => {}}
        textareaRef={{ current: null }}
        handleKeyPress={() => {}}
        isTyping={false}
      />
    );
    const textarea = screen.getByPlaceholderText('Ask me anything...');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(setInput).toHaveBeenCalledWith('hello');
  });
});
