import { describe, expect, test } from 'vitest';
import { server } from '@/__tests__/setup';
import { rest } from 'msw';
import { waitFor } from '@testing-library/react';
import { useGetCharacter } from '@/application/hooks/useGetCharacter';
import { renderHookWithClient } from '@/__tests__/utils/test-utils';

describe('useGetCharacter custom hook tests', () => {
  test('Successful query', async () => {
    const { result } = renderHookWithClient(() => useGetCharacter('1234'));

    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.isError).toBe(false);
  });

  test('Failed query', async () => {
    server.use(
      rest.get('/get/failed', (_req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    const { result } = renderHookWithClient(() => useGetCharacter(''));
    await waitFor(() => expect(result.current.error).toBeNull());
  });
});
