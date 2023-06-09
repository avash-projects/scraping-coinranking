import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast"
import AppRouterProvider from './routes';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
