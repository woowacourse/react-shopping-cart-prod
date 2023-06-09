import React, { ErrorInfo } from 'react';
import CorsErrorFallback from 'CorsErrorFallback';
import LoadingErrorCard from 'components/LoadingErrorCard/LoadingErrorCard';
import ExtendedError from 'utils/ExtendError';
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

  static getDerivedStateFromError(error: ExtendedError): ErrorBoundaryState {
    if (error.errorCode === 403) {
      return { hasError: true, isCorsError: true, isAuthError: false, isNetworkError: false };
    }
    if (error.errorCode === 500) {
      return { hasError: true, isCorsError: false, isAuthError: false, isNetworkError: true };
    }
    if (error.errorCode === 404) {
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
        return <div>로그인페이지</div>;
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
