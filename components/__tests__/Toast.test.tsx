import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Toast } from '../Toast';

describe('Toast', () => {
  it('renders with correct message and type', () => {
    const message = 'Test message';
    const type = 'success';
    const onHide = jest.fn();

    render(<Toast message={message} type={type} onHide={onHide} />);

    expect(screen.getByText(message)).toBeTruthy();
  });

  it('calls onHide after animation', async () => {
    const message = 'Test message';
    const type = 'success';
    const onHide = jest.fn();

    render(<Toast message={message} type={type} onHide={onHide} />);

    await waitFor(() => {
      expect(onHide).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('applies correct background color based on type', () => {
    const message = 'Test message';
    const onHide = jest.fn();

    const { rerender } = render(
      <Toast message={message} type="success" onHide={onHide} />
    );
    expect(screen.getByTestId('toast-container')).toHaveStyle({
      backgroundColor: '#4CAF50',
    });

    rerender(<Toast message={message} type="error" onHide={onHide} />);
    expect(screen.getByTestId('toast-container')).toHaveStyle({
      backgroundColor: '#F44336',
    });

    rerender(<Toast message={message} type="info" onHide={onHide} />);
    expect(screen.getByTestId('toast-container')).toHaveStyle({
      backgroundColor: '#2196F3',
    });
  });
}); 