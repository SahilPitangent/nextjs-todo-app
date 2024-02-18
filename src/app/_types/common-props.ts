import type { ReactNode } from 'react';

export type ErrorComponentProps = {
   error: Error & { digest?: string };
   reset: () => void;
};

export type LayoutComponentProps = Readonly<{
   children: ReactNode;
}>;
