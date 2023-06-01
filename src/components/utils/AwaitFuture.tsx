import { Suspense, useMemo } from 'react';
import type Future from '../../utils/Future';
import ErrorBoundary from './ErrorBoundary';

type AwaitFutureLoaderProps<TData> = {
  future: Future<TData>;
  children: (data: TData) => React.ReactElement;
};

const AwaitFutureLoader = <TData,>(props: AwaitFutureLoaderProps<TData>) => {
  const { future, children } = props;
  const data = future.unwrap();

  return children(data);
};

type AwaitFutureProps<TData> = {
  future: Future<TData>;
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
  children: (data: TData) => React.ReactElement;
};

const AwaitFuture = <TData,>(props: AwaitFutureProps<TData>) => {
  const { future, loadingElement, errorElement, children } = props;

  // state가 변경되었을 때 새로 렌더링하기 위함
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const key = useMemo(() => Date.now(), [future]);

  return (
    <ErrorBoundary key={key} fallback={errorElement}>
      <Suspense fallback={loadingElement}>
        <AwaitFutureLoader future={future}>{children}</AwaitFutureLoader>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AwaitFuture;
