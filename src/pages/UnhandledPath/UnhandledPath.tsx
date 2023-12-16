import React from 'react';
import styles from './UnhandledPath.module.css';
import { useLoading } from '../../App/App';

export function UnhandledPath() {
  const loadingCtx = useLoading();

  React.useEffect(() => {
    loadingCtx.setLoading(false);

    document.body.classList.add('unhandled');
    return () => {
      document.body.classList.remove('unhandled');
    }
  });

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <span>Не могу найти страницу :(</span>
    </div>
  )
}