import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import styles from './App.module.css';
import 'minireset.css';
import routes from '../routes';
import { UnhandledPath } from '../pages/UnhandledPath/UnhandledPath';


function AppLayout() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main_container}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const App = createBrowserRouter([{
  element: <AppLayout/>,
  children: [
    ...routes.map((item): RouteObject => {
      return {
        path: item.basepath + item.params.join('/'),
        element: item.element,
        loader: item.loader
      }
    }),
    {
      path: '*',
      element: <UnhandledPath/>
    }
  ]
}]);
