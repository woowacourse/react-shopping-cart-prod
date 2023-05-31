import styled from 'styled-components';

const Container = styled.section`
  float: right;

  width: 400px;
  margin-top: 28px;

  border: 0.5px solid ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.fonts.order_info}
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 70px;

  background-color: ${({ theme }) => theme.colors.gray300};
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;
`;

const OrderPrice = () => {
  return (
    <Container>
      <Title>결제금액 정보</Title>
      <TotalPrice>
        <p>총 결제금액</p> <p>10000</p>
      </TotalPrice>
    </Container>
  );
};

export default OrderPrice;
