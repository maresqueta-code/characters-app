import { Header } from '@/presentation/components/common/Header/Header';
import { ImageLink } from '@/presentation/components/common/ImageLink/ImageLink';
import { FavouriteCounter } from '@/presentation/components/common/FavouriteCounter/FavouriteCounter';
import { ProgressBar } from '@/presentation/components/common/ProgressBar/ProgressBar';

export function DefaultHeader() {
  return (
    <Header>
      <ImageLink />
      <FavouriteCounter />
      <ProgressBar />
    </Header>
  );
}
