import { MagnifyingGlass } from '@/presentation/components/common/icons-factory';
import { IconInput } from '@/presentation/components/common/IconInput/IconInput';
import type { SVGIcon } from '@/presentation/components/common/icons-factory/types';
import { useFilterInput } from '@/presentation/hooks/useFilterInput';

export interface FilterInputProps {
  isLoading: boolean;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  Icon?: SVGIcon;
}

export function FilterInput({
  isLoading,
  id,
  name,
  className,
  placeholder,
  Icon,
}: FilterInputProps) {
  const { debounced } = useFilterInput();
  return (
    <IconInput
      className={className || 'bottom-border'}
      id={id || 'character-filter'}
      name={name || 'character-filter'}
      disabled={isLoading}
      onChange={(e) => debounced(e.target.value)}
      autoComplete="off"
      placeholder={placeholder || 'SEARCH CHARACTER...'}
    >
      {Icon ? <Icon /> : <MagnifyingGlass />}
    </IconInput>
  );
}
