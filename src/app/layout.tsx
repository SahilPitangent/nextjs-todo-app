import NotificationContainer from '@/components/NotificationContainer/NotificationContainer';
import type { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import ThemeRegistry from './_theme/ThemeRegistry';
import type { LayoutComponentProps } from './_types/common-props';

export const metadata: Metadata = {
   title: 'ToDo App | Home',
   description: 'Create, store and manage your todos',
};

export default function RootLayout({ children }: LayoutComponentProps) {
   return (
      <html lang="en">
         <body>
            <ThemeRegistry>
               <NotificationContainer />
               {children}
            </ThemeRegistry>
         </body>
      </html>
   );
}
