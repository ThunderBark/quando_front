import React from 'react';
import './App.css';
import Navbar from '../components/Navbar/Navbar';
import { RoutesElement } from '../routes';
import { Footer } from '../components/Footer.tsx/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RoutesElement />
      <Footer />
    </div>
  );
}

export default App;
