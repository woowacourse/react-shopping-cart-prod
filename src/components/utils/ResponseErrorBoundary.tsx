import type { PropsWithChildren } from 'react';
import RestClientResponse from '../../api/RestClientResponse';
import type { HttpResponse } from '../../api/rest/RestAPI';
import ErrorBoundary from './ErrorBoundary';

type ResponseErrorBoundaryProps<TResponse extends HttpResponse> = PropsWithChildren<{
  catches: (response: RestClientResponse<TResponse>) => TResponse | null;
  fallback?: React.ReactNode | ((response: TResponse) => React.ReactNode);
}>;

const ResponseErrorBoundary = <TResponse extends HttpResponse = HttpResponse>(
  props: ResponseErrorBoundaryProps<TResponse>,
) => {
  const { catches, fallback, children } = props;

  return (
    <ErrorBoundary
      catches={(thrown) =>
        thrown instanceof RestClientResponse<TResponse> && catches(thrown) !== null
      }
      fallback={fallback}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ResponseErrorBoundary;
