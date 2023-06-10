import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@common/Button";
import { styled } from "styled-components";
import * as S from "./ErrorBoundary.style";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    console.log("error: ", error);
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트
    return { hasError: true };
  }

  public handleRefresh() {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <S.BoundaryContainer>
          <S.Message>데이터를 불러올 수 없습니다 !!</S.Message>
          <Button primary={true} size="l" onClick={this.handleRefresh}>
            새로고침
          </Button>
        </S.BoundaryContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
