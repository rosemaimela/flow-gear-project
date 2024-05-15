import React from 'react';
import { Outlet } from 'react-router-dom';
import AppFooter from 'assets/footer/footer';
import AppHeader from 'assets/header/header';

const Layout = () => {
  return (
    <>
      <AppHeader title='Company name' />
      <Outlet />
      <AppFooter />
    </>
  )
};

export default Layout;