import React from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import Admin from './Admin.js';
import Home from './Home.js';
import UserRegistration from './UserRegistration.js';

/**
 * Routes Component
 * 
 * Renders the main routing logic for the application, mapping different routes to their respective components.
 * 
 * It also handles the state of users fetched from the database.
 */

const AppRoutes = () => {
    

    return (
        <main data-testid="routes">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/register" element={<UserRegistration />} />
            </Routes>
        </main>
    )
}

export default AppRoutes;