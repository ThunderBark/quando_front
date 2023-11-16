import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className={styles.container}>
      <div className={styles.label}>
        <Link to='/'>Profile</Link>
      </div>
      <div className={styles.label}>
        <Link to='/tournaments'>Tournaments</Link>
      </div>
    </nav>
  );
};

export default Navbar;