import type { SVGIcon, SVGIconProps } from '@/presentation/components/common/icons-factory/types';
import './ToggleButton.css';

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  ActiveIcon: SVGIcon;
  InactiveIcon: SVGIcon;
  activeIconProps?: SVGIconProps;
  inactiveIconProps?: SVGIconProps;
  label: string;
  className?: string;
  as?: 'button' | 'div' | 'a'; // Allow to change the root element
}

export function ToggleButton({
  isActive,
  onToggle,
  ActiveIcon,
  InactiveIcon,
  activeIconProps,
  inactiveIconProps,
  label = 'Toggle button',
  className = 'toggle-btn no-border',
  as: Component = 'button',
}: ToggleButtonProps) {
  return (
    <Component
      role="button"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-pressed={isActive} // Shows current state for accesibility
      aria-label={label} // Accesible name
      className={className}
    >
      {isActive ? <ActiveIcon {...activeIconProps} /> : <InactiveIcon {...inactiveIconProps} />}
    </Component>
  );
}
