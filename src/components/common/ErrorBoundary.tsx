import { AxiosError } from 'axios';
import React, { Component, PropsWithChildren } from 'react';

export interface FallbackProps {
  message?: string;
  resetErrorBoundary?: () => void;
}

interface ErrorBoundaryProps {
  Fallback: React.ComponentType<FallbackProps>;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: AxiosError;
}

const initialState: State = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState(initialState);
  };

  static getDerivedStateFromError(error: AxiosError): State {
    return { hasError: true, error };
  }

  render() {
    const { Fallback } = this.props;

    if (this.state.hasError) {
      return (
        <Fallback
          message={
            (this.state.error?.response?.data as string) || '알 수 없는 에러가 발생했습니다.'
          }
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
