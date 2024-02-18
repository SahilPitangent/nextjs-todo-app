'use client';

import { useEffect } from 'react';
import type { ErrorComponentProps } from './_types/common-props';

export default function GlobalError({ error, reset }: ErrorComponentProps) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <html>
         <body>
            <h2>{error?.message ? error?.message : 'Something went wrong!'}</h2>
            <button onClick={() => reset()}>Try again</button>
         </body>
      </html>
   );
}
