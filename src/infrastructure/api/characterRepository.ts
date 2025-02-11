import { API_ENDPOINTS, BASE_URL } from './apiConstants';
import type { CharacterDTO, TransformationDTO } from './characterDTO.types';

export const characterRepository = {
  getAll: async (): Promise<CharacterDTO[]> => {
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.CHARACTERS}?limit=50`, {
        method: 'GET',
      });
      const data = await response.json();
      return data.items;
    } catch (error) {
      throw Error('Network issue');
    }
  },

  getById: async (id: string): Promise<TransformationDTO[]> => {
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.CHARACTERS}/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data.transformations;
    } catch (error) {
      throw Error('Network issue');
    }
  },
};
