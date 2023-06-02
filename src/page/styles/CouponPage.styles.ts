import styled from 'styled-components';

export const CouponHeader = styled.div`
  width: 600px;
  border-bottom: 1px solid #333333;
  padding-bottom: 28px;

  line-height: 37px;
  letter-spacing: 0.5px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;

  color: #333333;

  @media (max-width: 1199px) {
    width: 660px;
  }

  @media (max-width: 670px) {
    width: 100%;
  }
`;

export const CouponImage = styled.img<{ isUsed: boolean }>`
  margin-top: 24px;
  opacity: ${({ isUsed }) => (isUsed ? 0.3 : 1)};
  cursor: ${({ isUsed }) => (isUsed ? 'not-allowed' : 'default')};
`;

export const CouponParagraph = styled.p`
  font-size: 16px;
  margin-top: 8px;
  color: #aaaaaa;
`;
