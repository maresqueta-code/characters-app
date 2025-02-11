import { ImageLink } from '@/presentation/components/common/ImageLink/ImageLink';
import { ImageFooter } from '@/presentation/components/main-content/ImageFooter/ImageFooter';
import type { Character } from '@/domain/models/Character';
import './CharacterList.css';

export interface CharacterListProps {
  characters: Character[];
}

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <ul className="character-grid">
      {characters?.map((character) => {
        const { id, name, image } = character;
        return (
          <li
            key={id}
            className="character-item"
          >
            <ImageLink
              href={`/character/${id}`}
              img={image}
              imgAlt={`Go to ${name} detail page`}
              imgClassname="character-image"
            />
            <ImageFooter
              id={id}
              name={name}
            />
          </li>
        );
      })}
    </ul>
  );
}
