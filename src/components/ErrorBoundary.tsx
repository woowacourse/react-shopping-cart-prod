/* eslint-disable react/destructuring-assignment */

import React, { PropsWithChildren, ErrorInfo } from 'react';
import { ErrorBoundaryContext } from 'src/context/ErrorBoundaryContext';

interface ErrorBoundaryState {
  catch: boolean;
  error: any;
}

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: React.ReactNode;
  onError?: (error: Error, info: { componentStack: string }) => void;
  onReset?: (details: { reason: 'imperative-api'; args: any[] }) => void;
}

const initialState: ErrorBoundaryState = {
  catch: false,
  error: null,
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: any) {
    return { catch: true, error };
  }

  componentDidCatch(error: any, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  resetErrorBoundary(...args: any[]) {
    if (this.state.error !== null) {
      this.props.onReset?.({
        args,
        reason: 'imperative-api',
      });

      this.setState(initialState);
    }
  }

  render() {
    // 비동기에서는 에러바운더리가 실행되지 않는다.
    // 비동기를 감싸는 함수를 만들고, 그것을 실행시켜야 한다.
    const fallbackProps = { error: this.state.error, catch: this.state.catch, reset: this.resetErrorBoundary };
    if (this.state.catch) {
      return React.createElement(ErrorBoundaryContext.Provider, { value: fallbackProps }, this.props.fallback);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
