import React from 'react';
const DashboardHome = React.lazy(() => import('./dashboard/home'));
const Users = React.lazy(() => import('./dashboard/users'));

export {
  DashboardHome,
  Users
};
