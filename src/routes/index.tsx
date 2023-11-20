import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Profile } from '../pages/Profile/Profile';
import Tournaments from '../pages/Tournaments/Tournaments';
import { UnhandledPath } from '../pages/UnhandledPath/UnhandledPath';

export function Content() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="*" element={<UnhandledPath />} />
    </Routes>
  )
}