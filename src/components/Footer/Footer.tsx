import React from 'react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        Создано <a href='https://vk.com/what_are_u_lookin_4'>мной</a>
      </div>
    </footer>
  )
}