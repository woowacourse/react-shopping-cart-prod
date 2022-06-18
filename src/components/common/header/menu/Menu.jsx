import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StyledMenu from "@/components/common/header/menu/Menu.styled";
import Badge from "@/components/common/badge/Badge";
import Dropdown from "@/components/common/dropdown/Dropdown";

import useToken from "@/hooks/useToken";

function Menu() {
  const cartList = useSelector((state) => state.cartListState);
  const count = cartList.length;
  const [token] = useToken();

  return (
    <StyledMenu>
      <ul>
        <li>
          <Link className="menu" to="/cart">
            장바구니
            {count > 0 && <Badge count={count} />}
          </Link>
        </li>
        <li>
          <Link className="menu" to="/not-found">
            주문목록
          </Link>
        </li>
        <li>
          {token ? (
            <Dropdown />
          ) : (
            <Link className="menu" to="/login">
              로그인
            </Link>
          )}
        </li>
      </ul>
    </StyledMenu>
  );
}

export default Menu;
