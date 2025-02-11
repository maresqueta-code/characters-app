import { Link } from 'react-router-dom';
import logo from '@/assets/marvel-logo.svg';

export interface ImageLinkProps {
  href?: string;
  img?: string;
  imgAlt?: string;
  imgClassname?: string;
}

export function ImageLink({
  href = '/',
  img = logo,
  imgAlt = 'Go to homepage',
  imgClassname = '',
}: ImageLinkProps) {
  return (
    <nav>
      <Link to={href}>
        <img
          src={img}
          className={imgClassname}
          alt={imgAlt}
        />
      </Link>
    </nav>
  );
}
