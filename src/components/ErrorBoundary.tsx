import type { PropsWithChildren } from 'react';
import React from 'react';
import { STATUS_ERROR_MESSAGE } from '../constants/index';
import ErrorBox from './ErrorBox';

interface ErrorBoundaryState {
  hasError: boolean;
  status: keyof typeof STATUS_ERROR_MESSAGE;
}

export class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      status: '400',
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, status: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBox status={this.state.status} />;
    }
    return this.props.children;
  }
}
