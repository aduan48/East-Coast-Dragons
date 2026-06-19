import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 
 * @returns whenever the pathname changes, it scrolls to teh top of the page
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Define the pages where I DO NOT want to jump to the top
    const ignoredPaths = ['/contact', '/schedule', '/home'];

    // 2. Only scroll to the top if the current page is NOT in that list
    if (!ignoredPaths.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null; //deletes when done
}

export default ScrollToTop;