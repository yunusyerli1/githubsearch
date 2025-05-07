import React from 'react';
import Link from 'next/link';
import { INavbarModel } from '@/lib/models/INavbarModel'; // Adjust the import path
import Image from 'next/image';
import classes from './navbar.module.scss';

interface NavbarProps {
  navItems: INavbarModel[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between">
      <Link href="/" className="cpointer">
        <Image
          src="/logo.png" 
          alt="moneytolia logo"
          width={200}
          height={30}
          style={{ objectFit: 'contain' }}
          className={classes.logo}
        />
      </Link>
      <div className={`${classes['navbar-links']} d-flex justify-content-end`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.route}>
              <Link href={item.route} className={item.isFeatured ? classes['btn-featured'] : 'none'}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;