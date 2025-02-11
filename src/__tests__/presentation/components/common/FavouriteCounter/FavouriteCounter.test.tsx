import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRoutedClient } from '@/__tests__/utils/test-utils';
import { FavouriteCounter } from '@/presentation/components/common/FavouriteCounter/FavouriteCounter';
import { useFavouritesStore } from '@/application/stores/favouritesStore';

vi.mock('@/application/stores/favouritesStore', () => ({
  useFavouritesStore: vi.fn(),
}));

const mockUseFavouritesStore = useFavouritesStore as unknown as jest.Mock;

describe('FavouriteCounter tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the favourite counter with the correct count', () => {
    mockUseFavouritesStore.mockReturnValue({ favourites: [1, 2, 3] });

    renderWithRoutedClient(<FavouriteCounter />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders 0 when there are no favourites', () => {
    mockUseFavouritesStore.mockReturnValue({ favourites: [] });

    renderWithRoutedClient(<FavouriteCounter />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
