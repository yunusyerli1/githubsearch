'use client';
import React from 'react';
import Link from 'next/link';
import { INavbarModel } from '@/lib/models/INavbarModel';
import Image from 'next/image';
import classes from './sidebar.module.scss';
import { usePathname } from 'next/navigation';
import SocialMedia from '../social-media/social-media';

interface NavbarProps {
    navItems: INavbarModel[];
}

const Sidebar: React.FC<NavbarProps> = ({ navItems }) => {

    const path = usePathname();

    return (
        <nav className={`${classes['sidebar-container']} d-flex flex-column align-items-center fs-20 pt-5 px-4`}>
            <div className={classes['sidebar-image']}></div>
            <div className="d-flex flex-column gap-3 mt-5">
                {navItems.map((item) => (

                    <Link
                        key={item.title}
                        href={item.route}
                        className={`${path === item.route ? classes['active-link'] : ''} secondary-hover text-decoration-none`}>
                        <div className="d-flex align-items-center">
                            <span className="pb-1">
                                {
                                    item.icon && <Image src={`/svg/${item.icon}.svg`} alt={item.icon} width={18} height={18} />
                                }
                            </span>
                            <span className="ms-2">{item.title}</span>
                        </div>
                    </Link>

                ))}

            </div>
            <div className={classes['social-media-section']}>
                <SocialMedia />
            </div>

        </nav >

    )
}

export default Sidebar;