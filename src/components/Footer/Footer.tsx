import React from 'react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        Создано <a rel='noreferrer' target='_blank' href='https://github.com/ThunderBark'>мной</a>
      </div>
    </footer>
  )
}