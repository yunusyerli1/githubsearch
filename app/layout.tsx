import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '@/styles/main.scss';
import BootstrapClient from '@/lib/utils/bootstrapClient';
import classes from './layout.module.scss';

import { INavbarModel } from '@/lib/models/INavbarModel';
import Navbar from '@/components/navbar/navbar';
import Sidebar from '@/components/sidebar/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const sideMenu: INavbarModel[] = [
    { title: "Campaigns", icon: "megaphone-line", route: "/" },
    { title: "Create Campaigns", icon: "add-circle-line", route: "/create" },
  ];

  const menuItems: INavbarModel[] = [
    { title: "Campaigns", route: "/", isFeatured: false },
    { title: "Create", route: "/create", isFeatured: false },
    { title: "Logout", route: "/logout", isFeatured: true },
  ];

  return (
    <html lang="en">
      <body >
        <div className={classes.main}>
          <div className="d-none d-md-block sidebar">
            <Sidebar navItems={sideMenu} />
          </div>
          <div className="container" style={{ overflowX: 'hidden' }}>
            <div className="row mt-3">
              <Navbar navItems={menuItems} />

            </div>
            {children}
            <BootstrapClient />
          </div>
        </div>

      </body>
    </html>
  );
}