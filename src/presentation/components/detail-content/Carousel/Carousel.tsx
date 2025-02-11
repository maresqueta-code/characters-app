import type { Transformation } from '@/domain/models/Transformation';
import './Carousel.css';

interface CarouselProps {
  transformations: Transformation[];
}

export function Carousel({ transformations }: CarouselProps) {
  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        data-testid="carousel-wrapper-testid"
      >
        <div className="carousel">
          {transformations.map(({ id, name, image, ki }) => (
            <article key={id}>
              <img
                src={image}
                alt={`${name}'s picture`}
              />
              <h2>{name}</h2>
              <p>{ki}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
