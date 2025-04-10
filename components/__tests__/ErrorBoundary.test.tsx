import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ErrorBoundary } from '../ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>Test content</Text>
      </ErrorBoundary>
    );
    expect(getByText('Test content')).toBeTruthy();
  });

  it('renders error UI when error occurs', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('allows retry after error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    const retryButton = getByText('Try again');
    fireEvent.press(retryButton);
    expect(getByText('Something went wrong')).toBeTruthy();
  });
}); 