import { useMemo } from 'react';
import { useGetCharacterList } from './useGetCharacterList';
import { useGetSearchTerm } from '@/application/stores/filterStore';
import { useFavouritesStore } from '../stores/favouritesStore';

export const useMainContent = () => {
  const searchTerm = useGetSearchTerm();
  const { favourites } = useFavouritesStore();

  const { data: characterList, isLoading, isError } = useGetCharacterList();

  const filteredCharacters = useMemo(() => {
    if (isLoading || isError || !characterList || !Array.isArray(characterList)) return [];
    return characterList.filter((character) => {
      const term = searchTerm.toLowerCase();
      return character?.name.toLowerCase().includes(term);
    });
  }, [isError, isLoading, characterList, searchTerm]);

  const favouriteCharacters = useMemo(() => {
    return filteredCharacters.filter((character) => favourites.includes(character.id));
  }, [filteredCharacters, favourites]);

  return { filteredCharacters, favouriteCharacters, isLoading };
};
