import { useLang } from '@/presentation/hooks/useLang';
import { Carousel } from '../Carousel/Carousel';
import { useDetailContent } from '@/application/hooks/useDetailContent';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { SlideDownAnimation } from '../../common/SlideDownAnimation/SlideDownAnimation';
import './DetailContent.css';

export function DetailContent() {
  const { t } = useLang();
  const { transformations } = useDetailContent();

  return (
    <SlideDownAnimation>
      <div className="detail-container">
        <section>{<CharacterCard />}</section>
        {transformations.length !== 0 && (
          <section className="comic-container">
            <div className="comic-title">
              <h1>{t.COMICS}</h1>
            </div>
            <Carousel transformations={transformations} />
          </section>
        )}
      </div>
    </SlideDownAnimation>
  );
}
