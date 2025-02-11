import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { CharacterCount } from '@/presentation/components/main-content/CharacterCount/CharacterCount';
import { renderWithRoutedClient } from '@/__tests__/utils/test-utils';

describe('CharacterCount tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the character count', () => {
    renderWithRoutedClient(<CharacterCount count={10} />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/10 results/i);
  });

  it('should render the no results message when list is empty', () => {
    renderWithRoutedClient(<CharacterCount count={0} />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/no results/i);
  });
});
