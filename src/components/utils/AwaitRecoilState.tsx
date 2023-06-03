import type { PropsWithChildren } from 'react';
import { Suspense, useMemo } from 'react';
import type { RecoilValueReadOnly } from 'recoil';
import { selector, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import ErrorBoundary from './ErrorBoundary';

type AwaitRecoilStateLoaderProps<T> = {
  state: RecoilValueReadOnly<T>;
  children?: (
    data: T,
  ) => PropsWithChildren extends { children?: infer Children } ? Children : never;
};

const AwaitRecoilStateLoader = <T,>(props: AwaitRecoilStateLoaderProps<T>) => {
  const { state, children } = props;
  const unwrapedState = useRecoilValue(state);

  return children?.(unwrapedState) as React.ReactElement;
};

type AwaitRecoilStateProps<T> = {
  state?: RecoilValueReadOnly<T>;
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
  children?: (
    data: T,
  ) => PropsWithChildren extends { children?: infer Children } ? Children : never;
};

const nullState = selector({ key: 'nullState', get: () => null });

const AwaitRecoilState = <T,>(props: AwaitRecoilStateProps<T>) => {
  const { errorElement, loadingElement, state, children } = props;

  const loadable = useRecoilValueLoadable(state ?? nullState);

  // state 혹은 loadable이 변경되었을 때 새로 렌더링하기 위함
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const key = useMemo(() => Date.now(), [state, loadable]);

  return (
    <ErrorBoundary key={key} catchesInstanceof={Error} fallback={errorElement}>
      <Suspense fallback={loadingElement}>
        {state && <AwaitRecoilStateLoader state={state}>{children}</AwaitRecoilStateLoader>}
      </Suspense>
    </ErrorBoundary>
  );
};

export default AwaitRecoilState;
