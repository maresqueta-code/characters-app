import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MOCKED_TRANSFORMATIONS } from '@/__mocks__/transformations';
import { MOCKED_TRANSLATIONS } from '@/__mocks__/translations';
import { useLang } from '@/presentation/hooks/useLang';
import { Carousel } from '@/presentation/components/detail-content/Carousel/Carousel';

vi.mock('@/presentation/hooks/useLang', () => ({
  useLang: vi.fn(),
}));

const mockUseLang = useLang as jest.Mock;

describe('Carousel tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all images inside the scrollable container', () => {
    mockUseLang.mockReturnValue({
      t: MOCKED_TRANSLATIONS,
    });

    render(<Carousel transformations={MOCKED_TRANSFORMATIONS} />);

    MOCKED_TRANSFORMATIONS.forEach(({ name }) => {
      expect(screen.getByAltText(`${name}'s picture`)).toBeInTheDocument();
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
