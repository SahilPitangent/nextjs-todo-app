'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import type { ErrorComponentProps } from '../_types/common-props';

export default function Error({ error, reset }: ErrorComponentProps) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div>
         <h2>{error?.message ? error?.message : 'Something went wrong!'}</h2>
         <button onClick={() => reset()}>Try again</button>
      </div>
   );
}
