import type { PropsWithChildren } from 'react';
import RestClientResponse from '../../api/RestClientResponse';
import type { HttpResponse } from '../../api/rest/RestAPI';
import ErrorBoundary from './ErrorBoundary';

type ResponseErrorBoundaryProps<TResponse extends HttpResponse> = PropsWithChildren<
  {
    catches: (response: RestClientResponse<TResponse>) => TResponse | null;
  } & (
    | { fallback?: React.ReactNode }
    | { fallbackRenderer?: (response: TResponse) => React.ReactNode }
  )
>;

const ResponseErrorBoundary = <TResponse extends HttpResponse = HttpResponse>(
  props: ResponseErrorBoundaryProps<TResponse>,
) => {
  const { catches, children, ...errorBoundaryProps } = props;

  return (
    <ErrorBoundary
      catches={(thrown) =>
        thrown instanceof RestClientResponse<TResponse> && catches(thrown) !== null
      }
      {...errorBoundaryProps}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ResponseErrorBoundary;
