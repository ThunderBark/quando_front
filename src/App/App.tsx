import { Outlet, RouteObject, createBrowserRouter, redirect, useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import styles from './App.module.css';
import 'minireset.css';
import routes from '../routes';
import { UnhandledPath } from '../pages/UnhandledPath/UnhandledPath';
import React from 'react';


type LoadingContext = {
  isLoading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export const useLoading = () => {
  return useOutletContext<LoadingContext>();
}

const AppLayout = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className={styles.app}>
      <Navbar
        isLoading={loading}
        setLoading={setLoading}
      />

      <main className={styles.main_container}>
        <Outlet context={{
          isLoading: loading,
          setLoading: setLoading
        } satisfies LoadingContext} />
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
      element: <UnhandledPath/>,
      loader: (args) => {
        if (location.pathname === '/quando_front/') {
          return redirect(routes[0].basepath);
        }
        return 0;
      }
    }
  ]
}]);
