import React, { useEffect, useState } from 'react';
import Layout from '../templates/Layout';
import Logo from '../atoms/Logo';
import HeaderElements from '../molecules/HeaderElements';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
 
    <header  className={isSticky ? 'sticky-header sticky' : 'sticky-header'}>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-2 col-5'>
                   <Logo /> 
                </div>
                <div className='col-lg-10 col-7'>
                    <HeaderElements />
                </div>
            </div>
        </div>
    </header>
  
  )
}

export default Header
