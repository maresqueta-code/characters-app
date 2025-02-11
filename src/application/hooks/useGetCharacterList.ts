import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { characterRepository } from '@/infrastructure/api/characterRepository';
import { mapCharacterFromApi } from '@/domain/mappers/characterMapper';
import type { Character } from '@/domain/models/Character';

//READ hook (get characters from api)
export function useGetCharacterList(): UseQueryResult<Character[], Error> {
  return useQuery<Character[], Error>({
    queryKey: ['characters'],
    queryFn: async () => {
      //send api request here
      const response = await characterRepository.getAll();
      return response.map(mapCharacterFromApi);
    },
  });
}
