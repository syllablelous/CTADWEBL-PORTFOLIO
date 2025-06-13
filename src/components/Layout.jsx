import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="layout-container">
        <Outlet />
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Layout;