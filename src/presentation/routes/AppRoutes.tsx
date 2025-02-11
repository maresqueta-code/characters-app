import { Route, Routes } from 'react-router-dom';
import { ROUTE_URLS } from './routeConstants';
import { DetailLayout } from '@/presentation/pages/DetailLayout';
import { HomeLayout } from '@/presentation/pages/HomeLayout';
import { ErrorPage } from '@/presentation/pages/ErrorPage';
import { useLang } from '@/presentation/hooks/useLang';

export function AppRoutes() {
  const { t } = useLang();
  return (
    <Routes>
      <Route
        path={ROUTE_URLS.CHARACTER_PAGE}
        element={<DetailLayout />}
      ></Route>
      <Route
        path={ROUTE_URLS.HOME_PAGE}
        element={<HomeLayout />}
      ></Route>
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
