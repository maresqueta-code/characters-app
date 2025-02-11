import { Link } from 'react-router-dom';
import { Heart } from '@/presentation/components/common/icons-factory';
import { useFavouritesStore } from '@/application/stores/favouritesStore';
import './FavouriteCounter.css';

export function FavouriteCounter() {
  const { favourites } = useFavouritesStore();

  return (
    <div className="fav-container">
      <Link
        to={'/favourites'}
        aria-label="Go to Favourites page"
      >
        <Heart className="fav-icon" />
      </Link>
      <p>{favourites.length}</p>
    </div>
  );
}
