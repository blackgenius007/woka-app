 /* eslint-disable */ 


// /* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import ErrorBoundary from './ErrorBoundary';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
        <ErrorBoundary>
        <Router />
        </ErrorBoundary>
    

    </ThemeProvider>
  );
}

 

