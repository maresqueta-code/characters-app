import { describe, expect, test } from 'vitest';
import { server } from '../../setup';
import { rest } from 'msw';
import { waitFor } from '@testing-library/react';
import { useGetCharacterList } from '@/application/hooks/useGetCharacterList';
import { renderHookWithClient } from '@/__tests__/utils/test-utils';

describe('useGetCharacterList custom hook tests', () => {
  test('Successful query', async () => {
    const { result } = renderHookWithClient(() => useGetCharacterList());

    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.isError).toBe(false);
  });

  test('Failed query', async () => {
    server.use(
      rest.get('/list/failed', (_req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    const { result } = renderHookWithClient(() => useGetCharacterList());

    await waitFor(() => expect(result.current.error).toBeNull());
  });
});
