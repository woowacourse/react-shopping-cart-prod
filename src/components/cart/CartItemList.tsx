import { styled } from "styled-components";
import { cartListState } from "recoil/cart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CartItem from "components/cart/CartItem";
import { useCartCheckbox } from "hooks/useCartCheckbox";
import { couponListState } from "recoil/coupon";
import { useEffect } from "react";
import { getCoupons } from "api/coupons";
import { serverSelectState } from "recoil/server";

const CartItemList = () => {
  const cartList = useRecoilValue(cartListState);
  const { isAllchecked, checkedCount, setAllCheckbox, removeCheckedItem } = useCartCheckbox();
  const selectedServer = useRecoilValue(serverSelectState);
  const setCouponList = useSetRecoilState(couponListState);

  const reloadCouponList = async () => {
    const coupons = await getCoupons(selectedServer);

    setCouponList(
      coupons.map((coupon) => {
        return { ...coupon, productId: null };
      })
    );
  };

  useEffect(() => {
    reloadCouponList();
  }, []);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.checked && setAllCheckbox(true);
    !e.currentTarget.checked && setAllCheckbox(false);
  };

  return (
    <Wrapper>
      <SelectorContainer>
        <input type="checkbox" checked={isAllchecked} onChange={handleCheckbox} />
        <CountBox>
          {checkedCount} / {cartList.length}
        </CountBox>
        <button onClick={removeCheckedItem}>선택삭제</button>
      </SelectorContainer>
      <ListBox>
        {cartList.map((item) => (
          <CartItem key={item.product.id} {...item} />
        ))}
      </ListBox>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;

  width: 65%;

  @media screen and (max-width: 800px) {
    width: 100%;

    margin-bottom: 25vh;
  }
`;

const SelectorContainer = styled.section`
  display: flex;
  gap: 10px;
  align-items: center;

  padding-bottom: 10px;
  border-bottom: 3px solid rgba(170, 170, 170, 1);

  font-size: 13px;

  & > input[type="checkbox"] {
    top: 15px;
    width: 40px;
    height: fit-content;

    transform: scale(1.6);
  }

  & > button {
    border: 1px solid rgba(187, 187, 187, 1);

    padding: 6px;

    background: inherit;
  }
`;

const CountBox = styled.p`
  font-size: 18px;
`;

const ListBox = styled.li`
  list-style: none;
  row-gap: 10px;

  ul:first-child {
    border-top: none;
  }
`;

export default CartItemList;
