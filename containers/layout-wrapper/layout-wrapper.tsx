'use client';
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { INavbarModel } from "@/lib/models/INavbarModel";
import Image from 'next/image';
import classes from './layout-wrapper.module.scss';
import BootstrapClient from "@/lib/utils/bootstrapClient";
import { useState } from "react";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const sideMenu: INavbarModel[] = [
      { title: "Campaigns", icon: "megaphone-line", route: "/" },
      { title: "Create Campaigns", icon: "add-circle-line", route: "/create" },
    ];
  
    const menuItems: INavbarModel[] = [
      { title: "Campaigns", route: "/", isFeatured: false },
      { title: "Create", route: "/create", isFeatured: false },
      { title: "Logout", route: "/logout", isFeatured: true },
    ];

    function toggleSidebar() {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }


    return (
        <div className={`${classes.main} ${isSidebarCollapsed ? classes['grid-container-full'] : classes['grid-container']}`}>
          <div className={`d-none sidebar ${ isSidebarCollapsed ? '' : 'd-md-block' }`}>
              <Sidebar navItems={sideMenu} />
        
          </div>
          <div className="container" style={{ overflowX: 'hidden' }}>
            <button 
            className={`btn btn-secondary d-none d-md-block  ${ isSidebarCollapsed ? classes['button-sidebar-collapsed'] : classes['button-sidebar-expanded'] }`}
            onClick={toggleSidebar}>
              <Image src="/svg/menu-duo-lg.svg" alt="logo" width={18} height={18} />
            </button>
            <div className="row mt-3">
              <Navbar navItems={menuItems} />

            </div>
            {children}
            <BootstrapClient />
          </div>
        </div>
    )

}