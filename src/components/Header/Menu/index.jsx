import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Badge from "@/components/Badge";
import Dropdown from "@/components/Dropdown";
import StyledMenu from "@/components/Header/Menu/index.styled";
import { PATH } from "@/constants";
import { getCart } from "@/redux/modules/cart";
import { getUserInfo, logoutUser } from "@/redux/modules/user";
import { getCookie } from "@/utils/auth";

function Menu() {
  const { cart } = useSelector((state) => state.cartState);
  const { authorized } = useSelector((state) => state.userState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatch(getUserInfo());
      dispatch(getCart());
    }
  }, []);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate(PATH.HOME);
  };

  return (
    <StyledMenu>
      <ul>
        <li>
          <Link to="/cart">
            장바구니
            {authorized && cart.length > 0 && <Badge count={cart.length} />}
          </Link>
        </li>
        <li>
          <Link to="/not-found">주문목록</Link>
        </li>
        <li>
          {authorized ? (
            <Dropdown onClick={handleLogoutClick} />
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </li>
      </ul>
    </StyledMenu>
  );
}

export default Menu;
