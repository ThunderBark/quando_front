import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className={styles.container}>
      <div className={styles.button}>
        <Link to='/'>ОБО МНЕ</Link>
      </div>
      {/* <div className={styles.button}>
        <Link to='/tournaments'>ТУРИКИ</Link>
      </div> */}
    </nav>
  );
};

export default Navbar;