import { ReactNode, Suspense, SuspenseProps } from "react";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithRender,
} from "react-error-boundary";

type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithRender,
  "fallbackRender" | "fallback" | "FallbackComponent"
>;

type AsyncBoundaryProps = {
  children: ReactNode;
  ErrorFallback: ErrorBoundaryPropsWithRender["fallbackRender"];
  SuspenseFallback: SuspenseProps["fallback"];
} & ExceptFallbackErrorBoundaryAttributes;

function AsyncBoundary({
  children,
  ErrorFallback,
  SuspenseFallback,
  ...restErrorBoundaryAttributes
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      {...restErrorBoundaryAttributes}
    >
      <Suspense fallback={SuspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
