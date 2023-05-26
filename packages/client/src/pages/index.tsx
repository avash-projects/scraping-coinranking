import React from 'react';
const DashboardHome = React.lazy(() => import('./dashboard/home'));
const Watchlist = React.lazy(() => import('./dashboard/watchlist'));

export {
  DashboardHome,
  Watchlist
};
