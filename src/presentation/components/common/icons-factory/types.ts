import type { ComponentType } from 'react';

export type SVGIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  className?: string;
};

export type SVGIcon = ComponentType<SVGIconProps>;
