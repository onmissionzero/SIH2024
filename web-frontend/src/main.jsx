import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import { ProfileProvider } from './contexts/Profile';
import PrivateRoute from './components/PrivateRoute';

import './index.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
                <Route 
                    index 
                    element={<PrivateRoute element={<Home />} />} 
                />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ProfileProvider>
            <RouterProvider router={router} />
        </ProfileProvider>
    </React.StrictMode>
);
