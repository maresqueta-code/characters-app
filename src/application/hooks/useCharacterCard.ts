import { useParams } from 'react-router-dom';
import { useGetCharacterList } from './useGetCharacterList';

export const useCharacterCard = () => {
  const { characterId } = useParams();
  const { data: characterList } = useGetCharacterList();
  const { id, name, description, image } = characterList?.find(
    (character) => character.id === Number(characterId),
  ) || {
    id: -1,
    name: 'No name.',
    description: 'No description.',
    image: '',
  };

  return {
    id,
    name,
    description,
    image,
  };
};
