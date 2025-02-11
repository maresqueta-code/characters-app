import { useGetCharacter } from './application/hooks/useGetCharacter';
import { useGetCharacterList } from './application/hooks/useGetCharacterList';

export function App() {
  const { data } = useGetCharacterList();

  const { data: details } = useGetCharacter('1');
  console.log(data, details);
  return <div>Character App</div>;
}
