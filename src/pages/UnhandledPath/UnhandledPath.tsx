import React from 'react';
import styles from './UnhandledPath.module.css';

export function UnhandledPath() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <span>Не могу найти страницу :(</span>
    </div>
  )
}