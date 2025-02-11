import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import 'globals';
import { handlers } from './utils/msw-utils';

// For the time being, had to downgrade the code to work with previous version of msw due to
//  this issue https://github.com/mswjs/msw/issues/2106
const server = setupServer(...handlers);
const env = import.meta.env['VITE_ENV'] || '';
if (env === 'DEV' || env === 'TEST') {
  // Establish API mocking before all tests.
  beforeAll(() => server.listen());

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  afterEach(() => {
    cleanup();
  });

  // Clean up after the tests are finished.
  afterAll(() => server.close());
}

export { server };
