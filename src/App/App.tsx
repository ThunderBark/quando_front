import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import styles from './App.module.css';
import { Profile } from '../pages/Profile/Profile';
import 'minireset.css';
import { Apod, IsApodDateValid } from '../pages/Apod/Apod';
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


const app = createBrowserRouter([{
  element: <AppLayout/>,
  children: [
  {
    path: '/',
    element: <Profile/>
  },
  {
    path: '/apod/:date?',
    element: <Apod/>,
    loader: (url) => {
      if (url.params.date === undefined) {
        return redirect('/apod/' + new Date().toISOString().substring(0, 10));
      }

      const apodDateString = IsApodDateValid(url.params.date);
      if (apodDateString === 'invalid') {
        return redirect('/404');
      }
      return new Date(apodDateString);
    }
  },
  {
    path: '*',
    element: <UnhandledPath/>
  }]
}]);

export default app;
