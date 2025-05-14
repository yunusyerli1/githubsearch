import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '@/styles/main.scss';
import LayoutWrapper from '@/containers/layout-wrapper/layout-wrapper';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // İstediğiniz temayı seçin
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ReduxProvider } from '@/lib/store/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body >
        <ReduxProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ReduxProvider>
           
         
      </body>
    </html>
  );
}