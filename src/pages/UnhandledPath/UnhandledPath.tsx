import React from 'react';
import styles from './UnhandledPath.module.css';

export function UnhandledPath() {
  React.useEffect(() => {
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