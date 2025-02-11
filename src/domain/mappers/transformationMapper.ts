import type { TransformationDTO } from '@/infrastructure/api/characterDTO.types';
import type { Transformation } from '@/domain/models/Transformation';

export const mapTransformationFromApi = ({
  id,
  name,
  ki,
  image,
}: TransformationDTO): Transformation => ({
  id,
  name,
  ki,
  image,
});
