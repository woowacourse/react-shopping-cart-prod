import type { PropsWithChildren } from 'react';
import React from 'react';

type ErrorBoundaryState<TError> = {
  caughtError: TError | undefined;
};

type ErrorBoundaryProps<TError> = PropsWithChildren<
  ({ catches: (error: unknown) => unknown } | { catchesInstanceof: new () => TError }) &
    ({ fallback?: React.ReactNode } | { fallbackRenderer?: (error: TError) => React.ReactNode })
>;

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
    const { props } = this;
    const { caughtError } = this.state;

    if (caughtError === undefined) return props.children;

    if ('fallbackRenderer' in props && typeof props.fallbackRenderer === 'function') {
      return props.fallbackRenderer(caughtError);
    }
    if ('fallback' in props) {
      return props.fallback;
    }
    return undefined;
  }
}

export default ErrorBoundary;
