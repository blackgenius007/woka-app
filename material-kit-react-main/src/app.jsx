 /* eslint-disable */ 


// /* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />

    </ThemeProvider>
  );
}

// import 'src/global.css';
// import { Route, Router, Switch } from 'react-router-dom';
// import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// import RouterComponent from 'src/routes/sections';

// import ThemeProvider from 'src/theme';

// import HomePage from './components/Home/homePage'; // Add a space here

// export default function App() {
//   return (
//     <ThemeProvider>
//       <Router>
//         <Switch>
//           <Route exact path="/" component={HomePage} /> {/* Set the home page route */}
//           <Route path="/login" component={RouterComponent} />
//         </Switch>
//       </Router>
//     </ThemeProvider>
//   );
// }


