import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Profile } from '../pages/Profile/Profile';
import Tournaments from '../pages/Tournaments/Tournaments';

export function Content() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/tournaments" element={<Tournaments />} />
    </Routes>
  )
}