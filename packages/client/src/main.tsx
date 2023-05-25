import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouterProvider from './routes';

// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('../mocks/browser.ts');
//   worker.start();
// }

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
    </QueryClientProvider>
  </React.StrictMode>
);