import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSkeleton } from '../LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<LoadingSkeleton />);
    expect(getByTestId('loading-skeleton')).toBeTruthy();
  });

  it('renders with custom width and height', () => {
    const { getByTestId } = render(
      <LoadingSkeleton width={200} height={100} />
    );
    const skeleton = getByTestId('loading-skeleton');
    expect(skeleton).toHaveStyle({
      width: 200,
      height: 100,
    });
  });

  it('renders with custom borderRadius', () => {
    const { getByTestId } = render(
      <LoadingSkeleton borderRadius={10} />
    );
    const skeleton = getByTestId('loading-skeleton');
    expect(skeleton).toHaveStyle({
      borderRadius: 10,
    });
  });
}); 