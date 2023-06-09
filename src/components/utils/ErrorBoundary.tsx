import type { PropsWithChildren } from 'react';
import React from 'react';

type ErrorBoundaryState<TError> = {
  caughtError: TError | undefined;
};

type ErrorBoundaryProps<TError> = PropsWithChildren<
  {
    catchesInstanceof?: new () => TError;
    catches?: (error: unknown) => boolean;
  } & ({ fallback?: React.ReactNode } | { fallbackRenderer?: (error: TError) => React.ReactNode })
>;

/**
 * 컴포넌트 렌더링 중 throw된 값을 catch합니다. 이는 대체로 {@link Error} 입니다.
 *
 * `catches` 혹은 `catchesInstanceof` prop을 사용하면 특정 값만 catch할 수 있습니다.
 * 만약 `catches`와 `catchesInstanceof` 둘 다 명시하지 않는다면 모든 값을 catch합니다.
 *
 * `catches`와 `catchInstanceof` 둘 다 사용한다면 `catchInstanceof` 를 먼저 검사한 뒤 `catches` 로 검사합니다.
 *
 * @example
 * <ErrorBoundary
 *   catches={(thrown) => thrown instanceof MyError}
 *   fallback={<div>오류가 발생하였습니다!</div>}
 * >
 *   <UserInfo />
 * </ErrorBoundary>
 */
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

    if ('catchesInstanceof' in props && typeof props.catchesInstanceof === 'function') {
      if (!(thrown instanceof props.catchesInstanceof)) throw thrown;
    }
    if ('catches' in props && typeof props.catches === 'function') {
      if (!props.catches(thrown)) throw thrown;
    }
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
