import { useCharacterCard } from '@/application/hooks/useCharacterCard';
import { Heart, WireHeart } from '@/presentation/components/common/icons-factory';
import { ToggleButton } from '@/presentation/components/common/ToggleButton/ToggleButton';
import { useFavouritesStore } from '@/application/stores/favouritesStore';
import './CharacterCard.css';

export function CharacterCard() {
  const { favourites, toggleFavourite } = useFavouritesStore();
  const { id, name, description, image } = useCharacterCard();

  return (
    <div className="character-card-background">
      <div className="white-triangle"></div>
      <article className="character-card">
        <img
          src={image}
          alt={`${name}'s picture`}
        />
        <div className="character-card-info">
          <div className="character-card-info-title">
            <div>
              <h1>{name}</h1>
            </div>
            <div>
              <ToggleButton
                isActive={favourites.includes(id)}
                onToggle={() => toggleFavourite(id)}
                ActiveIcon={Heart}
                InactiveIcon={WireHeart}
                label="Favourite toggle"
              />
            </div>
          </div>
          <p>{description}</p>
        </div>
      </article>
    </div>
  );
}
