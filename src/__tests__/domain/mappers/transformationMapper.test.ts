import { transformationDTO } from '@/__mocks__/transformationDTO';
import { mapTransformationFromApi } from '@/domain/mappers/transformationMapper';

describe('mapTransformationFromApi tests', () => {
  it('should correctly map DTO to domain entity', () => {
    const expected = {
      id: 1,
      name: 'Goku SSJ',
      image: 'https://dragonball-api.com/transformaciones/goku_ssj.webp',
      ki: '3 Billion',
    };

    const result = mapTransformationFromApi(transformationDTO);
    expect(result).toEqual(expected);
  });
});
