import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Profile } from '../pages/Profile/Profile';

export function RoutesElement() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    )
}