import React, { ErrorInfo } from 'react';
import CorsErrorFallback from 'CorsErrorFallback';
interface ErrorBoundaryState {
  hasError: boolean;
  isCorsError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, isCorsError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error.message === 'CORS Error: Unable to make the request due to CORS restrictions.') {
      // Update state to indicate a CORS error
      return { hasError: true, isCorsError: true };
    }

    // Update state to show fallback UI for other errors
    return { hasError: true, isCorsError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.state.isCorsError) {
        return <CorsErrorFallback />;
      } else {
        console.log('ERRRI', this.state.hasError);
        // Render a generic fallback UI component for other errors
        return <div>s</div>;
      }
    }

    return this.props.children;
  }
}
