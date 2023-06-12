import { useNavigate } from "react-router-dom";
import ROUTER_PATH from "@router/constants/routerPath";
import * as S from "./OrderListButton.style";
import { CgProfile } from "react-icons/cg";

function OrderListButton() {
  const navigate = useNavigate();

  return (
    <S.HeaderIconWrapper
      onClick={() => {
        navigate(ROUTER_PATH.order);
      }}
    >
      <CgProfile />
    </S.HeaderIconWrapper>
  );
}

export default OrderListButton;
