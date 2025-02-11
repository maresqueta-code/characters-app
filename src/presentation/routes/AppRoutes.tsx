import { Route, Routes } from 'react-router-dom';
import { ROUTE_URLS } from './routeConstants';
import { ErrorPage } from '@/presentation/pages/ErrorPage';
import { useLang } from '@/presentation/hooks/useLang';

export function AppRoutes() {
  const { t } = useLang();
  return (
    <Routes>
      <Route
        path={ROUTE_URLS.ERROR_PAGE}
        element={<ErrorPage />}
      />
      <Route
        path={ROUTE_URLS.NOT_FOUND_PAGE}
        element={<ErrorPage title={t.NOT_FOUND} />}
      />
    </Routes>
  );
}
