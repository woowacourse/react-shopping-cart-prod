import type { CouponType } from '../../types';

import styled from 'styled-components';

interface Props extends CouponType {
  onClick?: () => void;
}

export default function Coupon({ name, discountRate, expiredAt, isUsed, onClick }: Props) {
  const date = new Date(expiredAt);
  const expirationDateMessage = `사용기간 : ~ ${date.getFullYear()}.${date.getMonth()}.${date.getDate()} 까지`;

  return (
    <Wrapper onClick={onClick}>
      <HeaderBox>
        <DiscountRate>{`${discountRate}% 할인`}</DiscountRate>
        <Tag isUsed={isUsed}>{isUsed ? '사용완료' : '사용가능'}</Tag>
      </HeaderBox>
      <div>
        <Name>{name}</Name>
        <ExpirationDate>{expirationDateMessage}</ExpirationDate>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div<Pick<Props, 'onClick'>>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 352px;
  height: 192px;
  border-radius: 12px;
  padding: 24px 20px;

  box-shadow: 0 0 8px #e8e8e8;
  background: #fcfcfc;
  background-image: url('/logoBlack.svg');
  background-size: 92px;
  background-repeat: no-repeat;
  background-position: bottom -4px right -4px;

  transition: transform 0.5s;

  &:hover {
    transform: scale(1.03);
    ${({ onClick }) => (onClick ? 'cursor: pointer;' : '')}
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DiscountRate = styled.p`
  margin-bottom: 12px;

  font-size: 32px;
  font-weight: 900;
  color: #e78a34;
`;

const Tag = styled.div<{ isUsed: Props['isUsed'] }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 24px;
  border-radius: 4px;
  padding: 0 4px;

  background: ${({ isUsed }) => (isUsed ? 'red' : '#04c09e')};

  font-size: 12px;
  font-weight: 600;
  color: white;
`;

const Name = styled.p`
  margin-bottom: 16px;

  font-size: 18px;
  font-weight: 900;
`;

const ExpirationDate = styled.p`
  margin-bottom: 6px;

  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;
