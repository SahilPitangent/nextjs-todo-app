'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StoreProvider from '../StoreProvider';
import type { LayoutComponentProps } from '../_types/common-props';

export default function TodosLayout({ children }: LayoutComponentProps) {
   const theme = useTheme();

   return (
      <StoreProvider>
         <Box maxWidth={800} mx="auto" pt={theme.spacing(10)}>
            {children}
         </Box>
      </StoreProvider>
   );
}
