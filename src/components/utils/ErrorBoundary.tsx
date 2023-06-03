import type { PropsWithChildren } from 'react';
import React from 'react';

type ErrorBoundaryState<TError> = {
  caughtError: TError | undefined;
};

type ErrorBoundaryProps<TError> = PropsWithChildren<
  | {
      catches: (error: unknown) => unknown;
      fallback?: ((error: TError) => React.ReactNode) | React.ReactNode;
    }
  | {
      catchesInstanceof: new () => TError;
      fallback?: ((error: TError) => React.ReactNode) | React.ReactNode;
    }
>;

const isClass = <T,>(value: unknown): value is new () => T => {
  return typeof value === 'function' && /^\s*class\s+/.test(value.toString());
};

class ErrorBoundary<TError> extends React.Component<
  ErrorBoundaryProps<TError>,
  ErrorBoundaryState<TError>
> {
  constructor(props: ErrorBoundaryProps<TError>) {
    super(props);
    this.state = { caughtError: undefined };
  }

  override componentDidCatch(thrown: unknown, thrownInfo: unknown) {
    const { props } = this;

    if ('catchesInstanceof' in props) {
      if (thrown instanceof props.catchesInstanceof) return;

      throw thrown;
    }
    if ('catches' in props) {
      if (props.catches(thrown)) return;
    }
    throw thrown;
  }

  static getDerivedStateFromError(error: unknown) {
    return { caughtError: error };
  }

  override render() {
    const { fallback, children } = this.props;
    const { caughtError } = this.state;

    if (caughtError === undefined) return children;

    if (typeof fallback === 'function') {
      return fallback(caughtError);
    }

    return fallback;
  }
}

export default ErrorBoundary;
