import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from './utils';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop('auto');
  }, [pathname]);

  return null;
};

export default ScrollToTop;

