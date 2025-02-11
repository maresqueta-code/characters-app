import { CharacterCard } from '../CharacterCard/CharacterCard';
import { SlideDownAnimation } from '../../common/SlideDownAnimation/SlideDownAnimation';
import './DetailContent.css';

export function DetailContent() {
  return (
    <SlideDownAnimation>
      <div className="detail-container">
        <section>{<CharacterCard />}</section>
      </div>
    </SlideDownAnimation>
  );
}
