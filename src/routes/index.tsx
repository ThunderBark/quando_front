import React from 'react';
import { Route, Routes, useParams} from 'react-router-dom';
import { Profile } from '../pages/Profile/Profile';
import Tournaments from '../pages/Tournaments/Tournaments';
import { UnhandledPath } from '../pages/UnhandledPath/UnhandledPath';
import { Apod } from '../pages/Apod/Apod';

export function Content() {
  // TODO: Редиректить apod на 404 если после него идет не дата

  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/apod/" element={<Apod date={new Date()} />} />
      {/* <Route path="/tournaments" element={<Tournaments />} /> */}
      <Route path="*" element={<UnhandledPath />} />
    </Routes>
  )
}