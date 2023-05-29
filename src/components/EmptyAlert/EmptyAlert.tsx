import {
  EmptyCartButton,
  EmptyCartButtonWrapper,
  EmptyCartDescription,
  EmptyCartTitle,
  EmptyCartWrapper,
} from "./EmptyAlert.style.ts";
import { useNavigate } from "react-router-dom";

interface EmptyAlertProps {
  message: string;
  goBack?: boolean;
  goHome?: boolean;
}

function EmptyAlert({ message, goBack, goHome }: EmptyAlertProps) {
  const navigate = useNavigate();

  return (
    <EmptyCartWrapper>
      <div>
        <EmptyCartTitle>텅</EmptyCartTitle>
        <EmptyCartDescription>{message}</EmptyCartDescription>
        <EmptyCartButtonWrapper>
          {goBack && (
            <EmptyCartButton onClick={() => navigate(-1)}>
              뒤로가기
            </EmptyCartButton>
          )}
          {goHome && (
            <EmptyCartButton onClick={() => navigate("/")}>
              홈으로 돌아가기
            </EmptyCartButton>
          )}
        </EmptyCartButtonWrapper>
      </div>
    </EmptyCartWrapper>
  );
}

export default EmptyAlert;
