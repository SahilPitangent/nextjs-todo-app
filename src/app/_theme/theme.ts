'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
   weight: ['300', '400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
});

let theme = createTheme({
   palette: {
      primary: {
         main: '#8DC63F',
         contrastText: '#f1f1f1',
      },
      secondary: {
         main: '#197CC0',
      },
      error: {
         main: '#EA3A3D',
      },
      success: {
         main: '#9febc8',
      },
      warning: {
         main: '#F9B959',
      },
   },
   typography: {
      fontFamily: raleway.style.fontFamily,
      h1: {
         fontSize: '2rem',
      },
      h2: {
         fontSize: '1.8rem',
      },
      h3: {
         fontSize: '1.6rem',
      },
      h4: {
         fontSize: '1.4rem',
      },
      h5: {
         fontSize: '1.2rem',
      },
      h6: {
         fontSize: '1rem',
      },
      body1: {
         fontSize: '.8rem',
      },
   },
   breakpoints: {
      values: {
         xs: 0,
         sm: 576,
         md: 768,
         lg: 992,
         xl: 1200,
      },
   },
});

theme = responsiveFontSizes(theme);

export default theme;
