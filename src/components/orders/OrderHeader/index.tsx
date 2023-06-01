import * as S from './OrderHeader.style';
interface OrderHeaderProps {
  text: string;
}

function OrderHeader({ text }: OrderHeaderProps) {
  return <S.Header>{text}</S.Header>;
}

export default OrderHeader;
