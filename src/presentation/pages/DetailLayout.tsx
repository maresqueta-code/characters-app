import { Outlet, useParams } from 'react-router-dom';
import { ErrorPage } from '@/presentation/pages/ErrorPage';
import { useGetCharacter } from '@/application/hooks/useGetCharacter';
import { useGetCharacterList } from '@/application/hooks/useGetCharacterList';
import { DefaultHeader } from '@/presentation/components/common/Header/DefaultHeader';
import { ResetScroll } from '@/presentation/components/common/ResetScroll/ResetScroll';
import { useLang } from '@/presentation/hooks/useLang';

export function DetailLayout() {
  const { t } = useLang();
  const { characterId } = useParams();
  const { isError } = useGetCharacterList();
  const { isError: isTransformationError } = useGetCharacter(characterId || '');
  if (isError || isTransformationError) return <ErrorPage title={t.SERVICE_UNAVAILABLE} />;
  return (
    <>
      <DefaultHeader />
      <main>
        <ResetScroll />
        <Outlet />
      </main>
    </>
  );
}
