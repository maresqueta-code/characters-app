import { vi } from 'vitest';
import { useDebouncedCallback } from 'use-debounce';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { FilterInput } from '@/presentation/components/common/FilterInput/FilterInput';

// Mock useDebounce
const mockedDebounce = vi.fn();

vi.mock('use-debounce', () => ({
  ...vi.importActual('use-debounce'),
  useDebouncedCallback: () => mockedDebounce,
}));

const renderSearch = async () => {
  renderHook(() => useDebouncedCallback(() => {}, 400));
  return render(<FilterInput isLoading={false} />);
};

describe('CharacterFilterInput tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the input enabled when not loading', () => {
    render(<FilterInput isLoading={false} />);
    const input = screen.getByPlaceholderText(/search character.../i);
    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
  });

  it('should render the input disabled when loading', () => {
    render(<FilterInput isLoading={true} />);
    const input = screen.getByPlaceholderText(/search character.../i);
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it('should trigger the debounce when typing ', async () => {
    const { getByRole } = await renderSearch();
    const searchBox = getByRole('searchbox');
    fireEvent.focus(searchBox);
    fireEvent.change(searchBox, { target: { value: 'character' } });
    expect(mockedDebounce).toHaveBeenCalled();
  });
});
