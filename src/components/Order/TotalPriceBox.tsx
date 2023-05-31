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
  height: 90px;
  padding: 0 24px;
  font-size: 24px;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const TotalPriceBody = styled.dl`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 150px;
  padding: 0 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  & > dt,
  dd {
    font-size: 20px;
    font-weight: 500;
  }
`;

export default TotalPriceBox;
