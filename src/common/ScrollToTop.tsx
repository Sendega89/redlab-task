import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from './utils';

/**
 * Компонент для автоматического скролла вверх при изменении маршрута
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop('auto');
  }, [pathname]);

  return null;
};

export default ScrollToTop;

