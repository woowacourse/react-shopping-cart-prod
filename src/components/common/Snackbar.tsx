import Portal from './Portal';
import styled, { keyframes } from 'styled-components';
import { flexCenter } from 'styles/mixin';
import { Payments } from '@compy-ryu/payments';
import theme from 'styles/theme';
import { useAppSelector } from 'hooks/useAppSelector';
import useSnackBar from 'hooks/useSnackBar';

export const Contents = {
  cart: '장바구니에 담았습니다.',
  payments: '상품을 구매하였습니다',
};

const Modal = () => {
  const { contentsType, value } = useAppSelector(state => state.snackbarReducer);
  const { closeModal } = useSnackBar();

  if (contentsType === 'cart') {
    return <Portal>{<StyledSnackbarContents>{Contents.cart}</StyledSnackbarContents>}</Portal>;
  }

  if (contentsType === 'payments') {
    return (
      <Portal>
        <PaymentsWrapper>
          <Payments
            amountPaid={value} /* 결제 필요 금액 */
            onClickPayment={cardId =>
              console.log(`결제 시 발생될 클릭 이벤트 => 카드 아이디 : ${cardId}`)
            }
            onClickCancel={event => {
              console.log(`결제 취소 시 발생될 클릭 이벤트 => 이벤트 객체: ${event}`);
              closeModal();
            }}
            onUpdatedCardData={cardList => {
              /* 카드 정보 업데이트(추가/제거/편집) 시 발생될 이벤트 */
              console.log(`저장된 카드 목록 배열 : ${cardList}`);
            }}
          />
        </PaymentsWrapper>
      </Portal>
    );
  }
};

export default Modal;

const snackbarShow = keyframes`
  0% { bottom:-7rem; opacity:0 }
  40%{ bottom:3rem; opacity:0 }
  65% { bottom:5rem; }
  80% { bottom:3rem; opacity:1 }
  100% { bottom:5rem; }
`;

const StyledSnackbarContents = styled.div`
  ${flexCenter};
  position: fixed;
  width: 50rem;
  height: 7rem;
  color: ${theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  left: 50%;
  bottom: -7rem;
  transform: translateX(-50%);
  font-size: 2.5rem;

  animation-name: ${snackbarShow};
  animation-duration: 0.5s;
  animation-direction: forwards;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

const PaymentsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  border-radius: 5px;
  font-size: 20px;
`;
