import React from 'react';
const DashboardHome = React.lazy(() => import('./dashboard/home'));
const Watchlist = React.lazy(() => import('./dashboard/watchlist'));
const AllNotification = React.lazy(() => import('./dashboard/notification'));

export {
  DashboardHome,
  Watchlist,
  AllNotification
};
