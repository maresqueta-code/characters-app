import { create } from 'zustand';
import { LOCAL_STORAGE_KEYS } from '@/infrastructure/persistence/localStorageKeys';
import { loadArrayData, saveArrayData } from '@/infrastructure/persistence/localStorage';

export interface FavouritesState {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

export const useFavouritesStore = create<FavouritesState>((set) => {
  const persisteditems = loadArrayData<number>(LOCAL_STORAGE_KEYS.FAVOURITES);

  return {
    favourites: persisteditems,
    toggleFavourite: (id) =>
      set((state) => {
        const isFavourite = state.favourites.includes(id);
        const updatedItems = isFavourite
          ? state.favourites.filter((favId) => favId !== id)
          : [...state.favourites, id];
        saveArrayData(LOCAL_STORAGE_KEYS.FAVOURITES, updatedItems);
        return { favourites: updatedItems };
      }),
  };
});
