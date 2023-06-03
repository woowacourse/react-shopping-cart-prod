import { createContext } from 'react';

export type ErrorBoundaryContextType = {
  catch: boolean;
  error: any;
};

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | null>(null);
