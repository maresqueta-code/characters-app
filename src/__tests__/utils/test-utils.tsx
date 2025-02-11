import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import {
  renderHook,
  type RenderHookOptions,
  type WrapperComponent,
} from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });
}

// Utility to wrap components with Router
export function renderWithRouter(ui: ReactElement): RenderResult {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

// Utility to wrap components with Router and QueryClientProvider
export function renderWithRoutedClient(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult {
  const queryClient = createTestQueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>,
    options,
  );
}

// Utility to wrap components with QueryClientProvider
export function renderWithClient(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult {
  const queryClient = createTestQueryClient();

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options);
}

// Utility for testing hooks with QueryClientProvider
export function renderHookWithClient<TProps extends { children?: ReactNode }, TResult>(
  hook: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
) {
  const queryClient = createTestQueryClient();

  const wrapper: WrapperComponent<TProps> = ({ children }: { children?: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(hook, { wrapper, ...options });
}
