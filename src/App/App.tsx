import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Content } from '../routes';
import { Footer } from '../components/Footer/Footer';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main_container}>
        <Content />
      </main>
      <Footer />
    </div>
  );
}

export default App;
