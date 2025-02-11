import type { CharacterDTO } from '@/infrastructure/api/characterDTO.types';
import type { Character } from '../models/Character';

export const mapCharacterFromApi = ({
  id,
  name,
  ki,
  maxKi,
  description,
  image,
}: CharacterDTO): Character => ({
  id,
  name,
  ki,
  maxKi,
  description,
  image,
});
