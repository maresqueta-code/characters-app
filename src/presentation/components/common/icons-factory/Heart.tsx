import type { SVGIcon, SVGIconProps } from './types';

const Heart: SVGIcon = ({
  width = 24,
  height = 22,
  fill = '#EC1D24',
  className = '',
}: SVGIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 22"
    fill="none"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z"
      fill={fill}
    />
  </svg>
);

export default Heart;
