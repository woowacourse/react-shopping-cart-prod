import styled from 'styled-components';

interface TotalPriceBoxProps {
  totalPrice: number;
}

const TotalPriceBox = ({ totalPrice }: TotalPriceBoxProps) => {
  return (
    <>
      <TotalPriceHeader>결제금액 정보</TotalPriceHeader>
      <TotalPriceBody>
        <dt>총 결제금액</dt>
        <dd>{totalPrice.toLocaleString('ko-KR')}원</dd>
      </TotalPriceBody>
    </>
  );
};

const TotalPriceHeader = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  padding: 0 12px;
  font-size: 18px;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.gray300};

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 0 24px;
    font-size: 20px;
  }
`;

const TotalPriceBody = styled.dl`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};

  & > dt,
  dd {
    font-size: 18px;
    font-weight: 500;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 0 24px;

    & > dt,
    dd {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export default TotalPriceBox;
