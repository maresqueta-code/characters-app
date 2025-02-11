import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Transformation } from '@/domain/models/Transformation';
import { characterRepository } from '@/infrastructure/api/characterRepository';
import { mapTransformationFromApi } from '@/domain/mappers/transformationMapper';

//READ hook (get a character's transformations by its id from api)
export function useGetCharacter(id: string): UseQueryResult<Transformation[], Error> {
  return useQuery<Transformation[], Error>({
    queryKey: ['character', id],
    enabled: !!id, // just enable the query when id is truthy
    queryFn: async () => {
      //send api request here
      const response = await characterRepository.getById(id);
      return response.map(mapTransformationFromApi);
    },
  });
}
