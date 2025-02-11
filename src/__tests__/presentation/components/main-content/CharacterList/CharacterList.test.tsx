import { screen, within } from '@testing-library/react';
import { MOCKED_CHARACTERS } from '@/__mocks__/characters';
import { renderWithRouter } from '@/__tests__/utils/test-utils';
import { CharacterList } from '@/presentation/components/main-content/CharacterList/CharacterList';

describe('CharacterList tests', () => {
  it('should render the characters', () => {
    renderWithRouter(<CharacterList characters={MOCKED_CHARACTERS} />);
    const characterList = screen.getByRole('list');
    const listItems = within(characterList).getAllByRole('listitem');

    expect(listItems.length).toBe(MOCKED_CHARACTERS.length);

    const img = screen.getByRole('img', { name: /goku/i });
    expect(img).toBeInTheDocument();
  });
});
