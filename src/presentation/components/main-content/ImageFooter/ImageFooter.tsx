import { useFavouritesStore } from '@/application/stores/favouritesStore';
import { Heart } from '@/presentation/components/common/icons-factory';
import './ImageFooter.css';

export interface ImageFooterProps {
  id: number;
  name: string;
}

export function ImageFooter({ id, name }: ImageFooterProps) {
  const { favourites, toggleFavourite } = useFavouritesStore();
  const isFavourite = favourites.includes(id);

  return (
    <div className={`image-footer ${isFavourite ? 'favourite' : ''} `}>
      <div className="overlay"></div>
      <span className="image-label">{name}</span>
      <div
        className="heart-container"
        onClick={() => toggleFavourite(id)}
      >
        <Heart
          className="heart"
          width={12}
          height={12}
        />
      </div>
    </div>
  );
}
