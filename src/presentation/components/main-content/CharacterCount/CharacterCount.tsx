import { useLang } from '@/presentation/hooks/useLang';
import './CharacterCount.css';

export interface CharacterCountProps {
  count: number;
}

export function CharacterCount({ count }: CharacterCountProps) {
  const { t } = useLang();
  return (
    <div className="result-label">
      <h3>{`${count || t.NO} ${t.RESULTS}`}</h3>
    </div>
  );
}
