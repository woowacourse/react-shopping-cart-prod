import type { PropsWithChildren } from "react";
import React from "react";
import { ERROR_MESSAGE } from "../constants/index";
import ErrorBox from "./ErrorBox";

interface ErrorBoundaryState {
  hasError: boolean;
  status:
    | (typeof ERROR_MESSAGE)[keyof typeof ERROR_MESSAGE]
    | "Something wrong!";
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      status: "default",
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
