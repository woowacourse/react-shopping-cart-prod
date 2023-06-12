import { Component, ReactNode } from 'react';
import { Button } from '@common/Button';

import * as S from './ErrorBoundary.style';

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

  static getDerivedStateFromError(error: Error) {
    console.log('error: ', error);

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
