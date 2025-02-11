import { QueryClient } from '@tanstack/react-query';
import { Query } from '@tanstack/react-query';
import { REACT_QUERY } from './reactQueryConstants';
import { LOCAL_STORAGE_KEYS } from '@/infrastructure/persistence/localStorageKeys';
import { loadStringData, saveStringData } from '@/infrastructure/persistence/localStorage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY.CACHE_TIME,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: REACT_QUERY.CACHE_TIME,
      refetchIntervalInBackground: true,
      retry: (failureCount) => failureCount < 5,
      // retries are delayed exponentially
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, REACT_QUERY.DELAY_LIMIT),
    },
  },
});

// Restore react-query cache from localStorage.
const restoreCache = () => {
  const cacheData = loadStringData(LOCAL_STORAGE_KEYS.CHARACTERS_CACHE);

  if (cacheData) {
    const parsedCache = JSON.parse(cacheData);
    (parsedCache as Array<Query>).forEach(({ queryKey, state }) => {
      queryClient
        .getQueryCache()
        .build(queryClient, {
          queryKey,
          queryFn: () => Promise.resolve(state.data),
        })
        .setState(state);
    });
  }
};

restoreCache();

// Persist react-query cache to localStorage
queryClient.getQueryCache().subscribe(({ type }) => {
  if (type === REACT_QUERY.UPDATED) {
    const cacheData = queryClient.getQueryCache().getAll();
    // Serialize just the required states.
    const serializedCache = cacheData.map((query) => ({
      queryKey: query.queryKey,
      state: query.state,
    }));
    // Persist to localStorage.
    saveStringData(LOCAL_STORAGE_KEYS.CHARACTERS_CACHE, JSON.stringify(serializedCache));
  }
});

export { queryClient };
