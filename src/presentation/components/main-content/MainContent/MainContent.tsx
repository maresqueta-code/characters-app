import { useMainContent } from '@/application/hooks/useMainContent';
import { CharacterList } from '@/presentation/components/main-content/CharacterList/CharacterList';
import { CharacterCount } from '@/presentation/components/main-content/CharacterCount/CharacterCount';
import { FilterInput } from '@/presentation/components/common/FilterInput/FilterInput';
import { useLang } from '@/presentation/hooks/useLang';
import './MainContent.css';

interface MainContentProps {
  listFavourites?: boolean;
}

export function MainContent({ listFavourites }: MainContentProps) {
  const { t } = useLang();
  const { filteredCharacters, favouriteCharacters, isLoading } = useMainContent();
  return (
    <div className="main-container main-container-hide-on-small">
      <section>
        {listFavourites && <h1>{t.FAVOURITES}</h1>}
        <FilterInput isLoading={isLoading} />
        <CharacterCount
          count={listFavourites ? favouriteCharacters.length : filteredCharacters.length}
        />
      </section>
      <CharacterList characters={listFavourites ? favouriteCharacters : filteredCharacters} />
    </div>
  );
}
