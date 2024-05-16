import React from 'react';
import { Outlet } from 'react-router-dom';
import AppFooter from 'assets/bootstrap/footer/footer';
import AppHeader from 'assets/bootstrap/header/header';

const Layout = () => {
  return (
    <>
      <AppHeader title='War Guardian Shop' />
      <div style={{
        minHeight: "60dvh"
      }}>
        <Outlet />

      </div>
      <AppFooter />
    </>
  )
};

export default Layout;