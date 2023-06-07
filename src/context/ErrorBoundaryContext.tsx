import { createContext } from 'react';

export type ErrorBoundaryContextType = {
  catch: boolean;
  error: any;
  reset: (...args: any[]) => void;
};

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | null>(null);
