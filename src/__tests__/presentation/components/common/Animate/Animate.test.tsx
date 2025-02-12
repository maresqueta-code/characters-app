import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Animate } from '@/presentation/components/common/Animate/Animate';

describe('Animate Component', () => {
  test('renders children correctly', () => {
    render(
      <Animate variants="fade-in">
        <p>Test Content</p>
      </Animate>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
