import {
  BigAlertButton,
  BigAlertButtonWrapper,
  BigAlertDescription,
  BigAlertTitle,
  BigAlertWrapper,
} from "./BigAlert.style.ts";
import { useNavigate } from "react-router-dom";

interface BigAlertProps {
  title: string;
  message: string;
  goBack?: boolean;
  goHome?: boolean;
}

function BigAlert({ title, message, goBack, goHome }: BigAlertProps) {
  const navigate = useNavigate();

  return (
    <BigAlertWrapper>
      <div>
        <BigAlertTitle>{title}</BigAlertTitle>
        <BigAlertDescription>{message}</BigAlertDescription>
        <BigAlertButtonWrapper>
          {goBack && (
            <BigAlertButton onClick={() => navigate(-1)}>
              뒤로가기
            </BigAlertButton>
          )}
          {goHome && (
            <BigAlertButton onClick={() => navigate("/")}>
              홈으로 돌아가기
            </BigAlertButton>
          )}
        </BigAlertButtonWrapper>
      </div>
    </BigAlertWrapper>
  );
}

export default BigAlert;
