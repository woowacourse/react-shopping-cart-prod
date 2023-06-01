import React, { ErrorInfo, PropsWithChildren, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorMessage: error.message });
  }

  retry() {
    this.setState({
      hasError: false,
      errorMessage: '',
    });
  }

  render() {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;

    return hasError ? (
      <>
        <h1>{errorMessage}</h1>
        <button type="button" onClick={() => this.retry()}>
          재시도
        </button>
      </>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
