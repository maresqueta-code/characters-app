import { Outlet } from 'react-router-dom';
import { useLang } from '@/presentation/hooks/useLang';
import { ErrorPage } from './ErrorPage';
import { ResetScroll } from '@/presentation/components/common/ResetScroll/ResetScroll';
import { useGetCharacterList } from '@/application/hooks/useGetCharacterList';
import { DefaultHeader } from '@/presentation/components/common/Header/DefaultHeader';

export function HomeLayout() {
  const { t } = useLang();
  const { isError } = useGetCharacterList();
  if (isError) return <ErrorPage title={t.SERVICE_UNAVAILABLE} />;

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
