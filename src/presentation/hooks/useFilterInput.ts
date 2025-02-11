import { useDebouncedCallback } from 'use-debounce';
import type { Filters } from '@/application/stores/filterStore';
import useFilterStore from '@/application/stores/filterStore';

export const useFilterInput = () => {
  const setSearchTerm = useFilterStore((state: Filters) => state.setSearchTerm);
  const debounced = useDebouncedCallback((value) => {
    setSearchTerm(value);
  }, 400);

  return {
    debounced,
  };
};
