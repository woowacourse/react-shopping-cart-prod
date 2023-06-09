import { styled } from 'styled-components';
import { IoRefreshCircle } from 'react-icons/io5';
import ErrorBoundary from './ErrorBoundary';
import Colors from '../constant/Colors';

class HeaderCartErrorBoundary extends ErrorBoundary {
  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <ErrorDiv>
        장바구니
        <br />
        오류
        <RetryButton onClick={this.retry} aria-label="다시 시도하기">
          <IoRefreshCircle
            style={{ backgroundColor: Colors.grey1 }}
            color={Colors.white}
            size="44px"
          />
        </RetryButton>
      </ErrorDiv>
    ) : (
      children
    );
  }
}

const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  column-gap: 10px;

  color: ${Colors.white};
  font-size: 0.8rem;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  cursor: pointer;
`;

export default HeaderCartErrorBoundary;
