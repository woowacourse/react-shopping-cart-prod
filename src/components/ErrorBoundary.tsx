/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { PropsWithChildren } from 'react';
import { ErrorInfo } from 'react';

interface ErrorBoundaryState {
  catch: boolean;
  error: any;
}

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: React.ReactNode;
  onError?: (error: Error, info: { componentStack: string }) => void;
}

const initialState: ErrorBoundaryState = {
  catch: false,
  error: null,
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: any) {
    return { catch: true, error };
  }

  componentDidCatch(error: any, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    const fallbackProps = { error: this.state.error };

    if (this.state.catch) {
      return React.createElement('div', fallbackProps, this.props.fallback);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
