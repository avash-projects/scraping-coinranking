import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Login } from '../pages/auth/login';
import { AuthWrapper, PublicWrapper } from './wrapper';
import {
  DashboardHome,
  Watchlist,
  AllNotification
} from '../pages';
import { DashboardLayout } from '../layouts';
import { NotFound } from '../pages/404';
import { Suspense } from 'react';
import { Spin } from 'antd';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <PublicWrapper component={<Login />} />,
  },
  {
    path: '/',
    element: <AuthWrapper component={<DashboardLayout />} />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' />
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<Spin />}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: 'watchlist',
        element: (
          <Suspense fallback={<Spin />}>
            <Watchlist />
          </Suspense>
        ),
      },
      {
        path: 'notifications',
        element: (
          <Suspense fallback={<Spin />}>
            <AllNotification />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
