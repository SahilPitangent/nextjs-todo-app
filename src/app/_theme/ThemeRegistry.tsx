'use client';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { LayoutComponentProps } from '../_types/common-props';
import theme from './theme';

export default function ThemeRegistry({ children }: LayoutComponentProps) {
   return (
      <AppRouterCacheProvider options={{ key: 'css' }}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
         </ThemeProvider>
      </AppRouterCacheProvider>
   );
}
