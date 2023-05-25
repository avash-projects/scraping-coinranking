import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../pages/auth/login';
import { AuthWrapper, PublicWrapper } from './wrapper';
import {
  DashboardHome,
  Users,
} from '../pages';
import { DashboardLayout } from '../ui/layouts';
import { NotFound } from '../pages/404';
import { Suspense, useEffect } from 'react';
import { Spin } from 'antd';
import useStore from '../store';

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
        element: (
          <Suspense fallback={<Spin />}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<Spin />}>
            <Users />
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
  const setSocket = useStore((state) => state.setSocket);
  const socket = useStore((state) => state.socket);
  useEffect(() => {
    setSocket();
    console.log("socket", socket)
    if (socket) {
      socket.on('scraping-started', () => {
        console.log("Scraping")
      })
    }
  }, [setSocket])
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
