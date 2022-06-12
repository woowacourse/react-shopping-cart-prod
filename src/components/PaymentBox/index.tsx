import { useCartSelector } from '@/hooks/useCartSelector';
import { CartState } from '@/types';
import { PaymentContainer, PaymentResultContainer, PaymentTitle } from './styles';
import { Button } from '@/components/@shared';

interface PaymentBoxProps {
  title: string;
  subTitle: string;
  amount: string;
  onClick: () => void;
  buttonName: string;
}

function PaymentBox({ title, subTitle, amount, onClick, buttonName }: PaymentBoxProps) {
  const { loading }: CartState = useCartSelector();

  return (
    <PaymentContainer loading={loading}>
      <PaymentTitle>{title}</PaymentTitle>
      <PaymentResultContainer>
        <div>
          <span>{subTitle}</span>
          <span>{amount}원</span>
        </div>
        <Button onClick={onClick}>{buttonName}</Button>
      </PaymentResultContainer>
    </PaymentContainer>
  );
}

export default PaymentBox;
