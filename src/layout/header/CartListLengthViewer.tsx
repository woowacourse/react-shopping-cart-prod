import { selector, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { cartItemsState } from '../../recoil/atoms/cartAtom';
import { APIAtom } from '../../recoil/atoms/serverAtom';

const cartProductListLengthState = selector({
  key: 'cartProductListLengthState',
  get: ({ get }) => {
    const apiEndPoint = get(APIAtom);
    const cartList = get(cartItemsState(apiEndPoint));

    return cartList.length;
  },
});

export const CartListLengthViewer = () => {
  const cartItemsLength = useRecoilValue(cartProductListLengthState);

  return <Style.CartAmount>{cartItemsLength}</Style.CartAmount>;
};

export const Style = {
  CartAmount: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26px;
    height: 26px;
    border-radius: 26px;

    padding-top: 3px;

    background-color: rgb(42, 193, 188);
    color: white;
    font-size: 16px;

    @media screen and (max-width: 480px) {
      width: 20px;
      height: 20px;
      font-size: 15px;
    }
  `,
};
