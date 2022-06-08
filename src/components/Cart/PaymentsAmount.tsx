import { useAppSelector } from 'hooks/useAppSelector';
import useSnackBar from 'hooks/useSnackBar';
import { useEffect } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const PaymentsAmount = ({ children }) => {
  const { openModal, closeModal } = useSnackBar();
  const { isSnackbarOpen } = useAppSelector(state => state.snackbarReducer);

  useEffect(() => {
    closeModal();
  }, []);

  const onClick = () => {
    const totalAmount = children[0];

    openModal({ type: 'payments', value: totalAmount });
  };

  return (
    <StyledRoot>
      <Header>결제 예상금액</Header>
      <Bottom>
        <TotalPrice>
          <UnderLineBox>
            <div>총 결제액</div>
          </UnderLineBox>
          <UnderLineBox>{children}</UnderLineBox>
        </TotalPrice>
        <OrderButton onClick={onClick}>주문하기</OrderButton>
      </Bottom>
      <Dimmed isSnackbarOpen={isSnackbarOpen} onClick={closeModal} />
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  grid-area: pa;

  width: 44.8rem;
  height: 31.8rem;
`;

const Header = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 2.4rem;
  line-height: 3.3rem;

  letter-spacing: 0.5px;

  padding: 2rem;
  border: 0.1rem silver solid;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  padding: 2rem;
  border: 1px silver solid;
`;

const TotalPrice = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.7rem;

  text-align: center;
  letter-spacing: 0.5px;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 6rem;
`;

const UnderLineBox = styled.div`
  background: linear-gradient(${theme.colors.white} 70%, ${theme.colors.red} 30%);
`;

const OrderButton = styled.button`
  width: 38.8rem;
  height: 7.3rem;
  font-size: 2.4rem;
  border-radius: 7px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
`;

const Dimmed = styled.div<{ isSnackbarOpen: boolean }>`
  display: ${props => (props.isSnackbarOpen ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default PaymentsAmount;
