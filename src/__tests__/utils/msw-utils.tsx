import { API_ENDPOINTS, BASE_URL } from '@/infrastructure/api/apiConstants';
import { rest } from 'msw';

export const handlers = [
  rest.get(`${BASE_URL}${API_ENDPOINTS.CHARACTERS}`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${BASE_URL}${API_ENDPOINTS.CHARACTERS}/:id`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
