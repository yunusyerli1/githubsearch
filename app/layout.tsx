import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '@/styles/main.scss';
import LayoutWrapper from '@/containers/layout-wrapper/layout-wrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
           
         
      </body>
    </html>
  );
}