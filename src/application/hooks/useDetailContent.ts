import { useMemo } from 'react';
import { useGetCharacter } from './useGetCharacter';
import { useParams } from 'react-router-dom';

export const useDetailContent = () => {
  const { characterId } = useParams();
  const { data: transformations, isLoading, isError } = useGetCharacter(characterId || '');

  const sortedTransfromations = useMemo(() => {
    if (isLoading || isError || !transformations || !Array.isArray(transformations)) return [];
    return transformations
      .slice(0, 20)
      .sort((a, b) => (a.ki.toLowerCase() > b.ki.toLowerCase() ? 1 : -1));
  }, [isError, isLoading, transformations]);

  return {
    characterId,
    transformations: sortedTransfromations,
    isLoading,
  };
};
