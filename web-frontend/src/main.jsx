import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Visualizations from './pages/Visualizations';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import { ProfileProvider } from './contexts/Profile';
import PrivateRoute from './components/PrivateRoute';
import { NotificationProvider } from './contexts/NotificationContext'; // Import NotificationProvider

import './index.css';
import LiveFootage from './pages/LiveFootage';
import Historical from './pages/Historical';
import Exhibits from './pages/Exhibits';
import Errors from './pages/Errors';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
                <Route 
                    index 
                    element={<PrivateRoute element={<Home />} />} 
                />
                <Route path="visualizations" element={<PrivateRoute element={<Visualizations />} />} />
                <Route path="errors" element={<PrivateRoute element={<Errors />} />} />
                <Route path="live-footage" element={<PrivateRoute element={<LiveFootage />} />} />
                <Route path="historical-data" element={<PrivateRoute element={<Historical />} />} />
                <Route path="exhibits" element={<PrivateRoute element={<Exhibits />} />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ProfileProvider>
            <NotificationProvider>
                <RouterProvider router={router} />
            </NotificationProvider>
        </ProfileProvider>
    </React.StrictMode>
);
