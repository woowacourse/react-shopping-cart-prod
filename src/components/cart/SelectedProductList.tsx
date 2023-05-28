import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { CART_URL } from '../../constants/url';
import { useFetchData } from '../../hooks/useFetchData';
import { useRemoveCheckedItemsFromCart } from '../../hooks/useRemoveCheckedItemsFromCart';
import { cartState, checkedItemList, serverState } from '../../recoil';
import { CartItem } from '../../types';
import Button from '../common/Button';
import { Checkbox } from './CheckboxStyle';
import SelectedProductItem from './SelectedProductItem';

const SelectedProductList = ({ productCountInCart }: { productCountInCart: number }) => {
  const [cart, setCart] = useRecoilState(cartState);
  const [checkedItems, setCheckedItems] = useRecoilState<number[]>(checkedItemList);
  const removeCheckedItemsFromCart = useRemoveCheckedItemsFromCart(checkedItems);
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();
  const initialCheckedItems = cart.map((item) => item.id);

  useEffect(() => {
    api
      .get(`${server}${CART_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setCart(data);
        setCheckedItems(data.map((item: CartItem) => item.id));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  const isAllChecked = checkedItems.length === productCountInCart && productCountInCart !== 0;

  const handleAllItemsCheck = () => {
    isAllChecked ? setCheckedItems([]) : setCheckedItems(initialCheckedItems);
  };

  const handleCheckedItemRemove = () => {
    removeCheckedItemsFromCart();
    setCheckedItems([]);
  };

  return (
    <S.Wrapper>
      <S.Title>{`든든배송 상품 (${productCountInCart}개)`}</S.Title>
      <div>
        {cart.map((item) => (
          <SelectedProductItem
            key={item.product.id}
            id={item.id}
            productId={item.product.id}
            name={item.product.name}
            price={item.product.price}
            imageUrl={item.product.imageUrl}
            quantity={item.quantity}
          />
        ))}
      </div>
      <S.Fieldset>
        <Checkbox
          type='checkbox'
          id='select-all'
          name='select-all'
          checked={isAllChecked}
          onChange={handleAllItemsCheck}
        />
        <label htmlFor='select-all'>{`전체선택 (${checkedItems.length}/${productCountInCart})`}</label>
        <Button css={deleteButtonStyle} onClick={handleCheckedItemRemove}>
          선택삭제
        </Button>
      </S.Fieldset>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.section`
    width: 100%;
    max-width: 736px;
    font-size: 18px;
    color: var(--text-color);
  `,

  Title: styled.h3`
    padding-bottom: 24px;
    border-bottom: 2px solid var(--gray-color-300);

    & + div {
      height: 410px;
      max-height: 410px;
      overflow-y: auto;

      /* Scroll bar */
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background: var(--text-color);
      }
      &::-webkit-scrollbar-track {
        border-radius: 8px;
        background: var(--gray-color-100);
      }
      &::-webkit-scrollbar-button:start:decrement,
      &::-webkit-scrollbar-button:end:increment {
        display: block;
        height: 6px;
        background: #fff;
      }

      @media (max-width: 420px) {
        padding: 0 10px;
      }
    }
  `,

  Fieldset: styled.fieldset`
    display: flex;
    align-items: center;
    padding: 36px 0 48px;
    font-size: 16px;

    @media (max-width: 548px) {
      font-size: 14px;
      padding: 20px 0 0;
    }
  `,
};

const deleteButtonStyle = css`
  margin-left: 20px;
  padding: 6px 12px 7px;
  background: none;
  border: 1px solid var(--gray-color-100);

  @media (max-width: 548px) {
    margin-left: 12px;
  }
`;

export default SelectedProductList;
