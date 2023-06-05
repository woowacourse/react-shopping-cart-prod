import {
  PaidBoxHeader,
  PaidBoxLayout,
  PaidInfo,
  PaidProperty,
  PaidText,
} from "./PaidBox.style.ts";

interface PaidBoxProps {
  paymentPrice: number;
}

function PaidBox({ paymentPrice }: PaidBoxProps) {

  return (
    <PaidBoxLayout>
      <PaidBoxHeader>결제금액정보</PaidBoxHeader>
      <PaidInfo>
        <PaidProperty>
          <PaidText>총 결제금액</PaidText>
          <PaidText>{paymentPrice.toLocaleString()}원</PaidText>
        </PaidProperty>
      </PaidInfo>
    </PaidBoxLayout>
  );
}

export default PaidBox;
