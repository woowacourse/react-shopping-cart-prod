import type { PropsWithChildren } from 'react';
import { Suspense, useMemo } from 'react';
import type Future from '../../utils/Future';

type AwaitFutureLoaderProps<TData> = {
  future: Future<TData>;
  children?: (
    data: TData,
  ) => PropsWithChildren extends { children?: infer Children } ? Children : never;
};

const AwaitFutureLoader = <TData,>(props: AwaitFutureLoaderProps<TData>) => {
  const { future, children } = props;
  const data = future.unwrap();

  return children?.(data) as React.ReactElement;
};

type AwaitFutureProps<TData> = {
  future?: Future<TData> | null;
  loadingElement?: React.ReactNode;
  children?: (
    data: TData,
  ) => PropsWithChildren extends { children?: infer Children } ? Children : never;
};

const AwaitFuture = <TData,>(props: AwaitFutureProps<TData>) => {
  const { future, loadingElement, children } = props;

  // state가 변경되었을 때 새로 렌더링하기 위함
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const key = useMemo(() => Date.now(), [future]);

  return (
    <Suspense key={key} fallback={loadingElement}>
      {future && <AwaitFutureLoader future={future}>{children}</AwaitFutureLoader>}
    </Suspense>
  );
};

export default AwaitFuture;
