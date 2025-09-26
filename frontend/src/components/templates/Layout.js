import React, { Children } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const Layout = ({children}) => {
  return (
    <>
    <Header />
      {children}
    <Footer />
    </>
  )
}

export default Layout
