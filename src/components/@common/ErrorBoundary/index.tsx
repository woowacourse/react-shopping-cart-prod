import { Component, ComponentType, PropsWithChildren } from 'react';

export interface FallbackProps {
  message: string;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  fallback: ComponentType<FallbackProps>;
  onReset: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

const initialState: ErrorBoundaryState = {
  error: null,
};

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  resetError = () => {
    this.props.onReset();
    this.setState(initialState);
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render() {
    const { fallback: FallbackComponent } = this.props;

    if (this.state.error) {
      return (
        <FallbackComponent
          message={this.state.error.message}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
