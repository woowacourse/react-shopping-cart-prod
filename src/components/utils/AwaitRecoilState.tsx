import type { PropsWithChildren } from 'react';
import { Suspense, useMemo } from 'react';
import type { RecoilValueReadOnly } from 'recoil';
import { useRecoilValue } from 'recoil';

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
  children?: (
    data: T,
  ) => PropsWithChildren extends { children?: infer Children } ? Children : never;
};

const AwaitRecoilState = <T,>(props: AwaitRecoilStateProps<T>) => {
  const { loadingElement, state, children } = props;

  // state가 변경되었을 때 새로 렌더링하기 위함
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const key = useMemo(() => Date.now(), [state]);

  return (
    <Suspense key={key} fallback={loadingElement}>
      {state && <AwaitRecoilStateLoader state={state}>{children}</AwaitRecoilStateLoader>}
    </Suspense>
  );
};

export default AwaitRecoilState;
