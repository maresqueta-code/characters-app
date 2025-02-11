import { API_ENDPOINTS, BASE_URL } from '@/infrastructure/api/apiConstants';
import { rest } from 'msw';
import { server } from '../setup';

const LIST_ALL = `${BASE_URL}${API_ENDPOINTS.CHARACTERS}`;

const GET = `${BASE_URL}${API_ENDPOINTS.CHARACTERS}/:id`;

export const handlers = [
  rest.get(LIST_ALL, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(GET, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const failedListAll = (status: number) => {
  server.use(
    rest.get(LIST_ALL, (_req, res, ctx) => {
      return res(ctx.status(status));
    }),
  );
};

export const failedGet = (status: number) => {
  server.use(
    rest.get(GET, (_req, res, ctx) => {
      return res(ctx.status(status));
    }),
  );
};
