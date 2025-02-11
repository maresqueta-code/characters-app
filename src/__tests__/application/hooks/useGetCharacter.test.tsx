import { describe, expect, test } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useGetCharacter } from '@/application/hooks/useGetCharacter';
import { failedGet } from '@/__tests__/utils/msw-utils';
import { renderHookWithClient } from '@/__tests__/utils/test-utils';

describe('useGetCharacter custom hook tests', () => {
  test('Successful query', async () => {
    const { result } = renderHookWithClient(() => useGetCharacter('1234'));

    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.isError).toBe(false);
  });

  test('Failed query', async () => {
    failedGet(500);
    const { result } = renderHookWithClient(() => useGetCharacter(''));

    await waitFor(() => expect(result.current.error).toBeNull());
  });
});
