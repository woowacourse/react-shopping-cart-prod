import { styled } from 'styled-components';
import { GrPowerReset } from 'react-icons/gr';
import ErrorBoundary from './ErrorBoundary';

class CartCouponErrorBoundary extends ErrorBoundary {
  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <ErrorDiv>
        서버에서 쿠폰 목록을 불러오지 못했어요
        <RetryButton onClick={() => this.retry()} aria-label="다시 시도하기">
          <GrPowerReset size="32px" />
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

  padding: 20px 30px;

  border: 1px solid #dddddd;
  color: #333333;
  font-weight: 400;
  font-size: 24px;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  cursor: pointer;
`;

export default CartCouponErrorBoundary;
