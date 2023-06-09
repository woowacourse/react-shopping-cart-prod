import React, { PropsWithChildren } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps extends PropsWithChildren {
  message?: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  retry() {
    this.setState({
      hasError: false,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <>
        <p>오류가 발생하였습니다.</p>
        <button type="button" onClick={this.retry}>
          재시도하기
        </button>
      </>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
