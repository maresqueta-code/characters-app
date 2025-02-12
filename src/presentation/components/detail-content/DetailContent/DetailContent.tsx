import { useLang } from '@/presentation/hooks/useLang';
import { Carousel } from '../Carousel/Carousel';
import { useDetailContent } from '@/application/hooks/useDetailContent';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { Animate } from '@/presentation/components/common/Animate/Animate';

import './DetailContent.css';

export function DetailContent() {
  const { t } = useLang();
  const { transformations } = useDetailContent();

  return (
    <Animate
      startY={-50}
      endY={0}
      variants={['slide-down', 'fade-in']}
    >
      <div className="detail-container">
        <section>
          <CharacterCard />
        </section>
        {transformations.length !== 0 && (
          <section className="comic-container">
            <div className="comic-title">
              <h1>{t.COMICS}</h1>
            </div>
            <Carousel transformations={transformations} />
          </section>
        )}
      </div>
    </Animate>
  );
}
