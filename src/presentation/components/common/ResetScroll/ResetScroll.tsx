import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * When the route is changed the scroll in the component replaced in the Outlet
 * gets reset.
 * @returns null since it doesn't need to render anything
 */
export const ResetScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
