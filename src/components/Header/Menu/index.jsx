import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StyledMenu from "@/components/Header/Menu/index.styled";
import Badge from "@/components/Badge";
import Dropdown from "@/components/Dropdown";
import { logoutUser } from "@/redux/modules/user";

function Menu() {
  const cartList = useSelector((state) => state.cartListState);
  const { authorized } = useSelector((state) => state.userState);
  const count = cartList.length;

  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <StyledMenu>
      <ul>
        <li>
          <Link to="/cart">
            장바구니
            {count > 0 && <Badge count={count} />}
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
