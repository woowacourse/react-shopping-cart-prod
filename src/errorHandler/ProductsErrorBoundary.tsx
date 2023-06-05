import { styled } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';

class PageContentErrorBoundary extends ErrorBoundary {
  render() {
    const { hasError } = this.state;
    const { children, message } = this.props;

    return hasError ? (
      <ErrorDiv>
        {message}
        <RetryButton onClick={() => this.retry()}>다시 시도하기</RetryButton>
      </ErrorDiv>
    ) : (
      children
    );
  }
}

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  margin-top: 100px;

  font-weight: 500;
  font-size: 30px;
`;

const RetryButton = styled.button`
  width: 300px;
  padding: 20px 50px;
  background-color: #333333;

  border: none;
  border-radius: 15px;

  font-size: 20px;
  color: #ffffff;

  cursor: pointer;
`;

export default PageContentErrorBoundary;
