import { create } from 'zustand';

export interface Filters {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const useFilterStore = create<Filters>()((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
}));

export function useGetSearchTerm() {
  return useFilterStore((state) => state.searchTerm);
}

export default useFilterStore;
