import React, { ErrorInfo } from 'react';
import CorsErrorFallback from 'CorsErrorFallback';
import LoadingErrorCard from 'components/LoadingErrorCard/LoadingErrorCard';
interface ErrorBoundaryState {
  hasError: boolean;
  isCorsError: boolean;
  isAuthError: boolean;
  isNetworkError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, isCorsError: false, isAuthError: false, isNetworkError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error.message === 'CORS Error: Unable to make the request due to CORS restrictions.') {
      return { hasError: true, isCorsError: true, isAuthError: false, isNetworkError: false };
    }
    if (error.message?.includes('서버문제로 HTTP 통신에 실패했습니다.')) {
      return { hasError: true, isCorsError: false, isAuthError: false, isNetworkError: true };
    }
    if (error.message?.includes('해당 멤버가 존재하지 않습니다.')) {
      return { hasError: true, isCorsError: false, isAuthError: true, isNetworkError: false };
    }
    // Update state to show fallback UI for other errors
    return { hasError: true, isCorsError: false, isAuthError: false, isNetworkError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.state.isCorsError) {
        return <CorsErrorFallback />;
      }
      if (this.state.isAuthError) {
        window.alert('해당 멤버가 존재하지 않습니다.');
        return;
      }
      if (this.state.isNetworkError) {
        window.alert('서버문제로 HTTP 통신에 실패했습니다.');
        return <LoadingErrorCard onClickRetryButton={() => (window.location.href = '/')} />;
      } else {
        console.log(this.state);
        // Render a generic fallback UI component for other errors
        return <LoadingErrorCard onClickRetryButton={() => (window.location.href = '/')} />;
      }
    }

    return this.props.children;
  }
}
