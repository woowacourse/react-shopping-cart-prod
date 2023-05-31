import { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { Checkbox } from '../../components/cart/CheckboxStyle';
import SelectedProductItem from '../../components/cart/SelectedProductItem';
import SelectedProductList from '../../components/cart/SelectedProductList';
import Button from '../../components/common/Button';
import { useCart } from '../../hooks/useCart';
import { cartState, checkedItemList } from '../../recoil';

const meta = {
  component: SelectedProductList,
  title: 'Components/Cart/SelectedProductList',
  tags: ['autodocs'],
} satisfies Meta<typeof SelectedProductList>;

export default meta;

export const ProductListInCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [checkedItemIdList, setCheckedItemIdList] = useRecoilState<number[]>(checkedItemList);
  const { removeItemFromCart } = useCart();

  useEffect(() => {
    setCart([
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: 'PET보틀-정사각(420ml)',
          price: 43400,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
        },
      },
      {
        id: 2,
        quantity: 4,
        product: {
          id: 2,
          name: 'PET보틀-밀크티(370ml)',
          price: 73400,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
        },
      },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productCountInCart = cart.length;
  const isAllChecked = checkedItemIdList.length === productCountInCart && productCountInCart !== 0;

  const initialCheckedItemIdList = cart.map((item) => item.id);

  const handleAllItemsCheck = () => {
    isAllChecked ? setCheckedItemIdList([]) : setCheckedItemIdList(initialCheckedItemIdList);
  };

  const handleCheckedItemRemove = () => {
    removeItemFromCart(checkedItemIdList);
    setCheckedItemIdList([]);
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
        <label htmlFor='select-all'>{`전체선택 (${checkedItemIdList.length}/${productCountInCart})`}</label>
        <Button css={deleteButtonStyle} onClick={handleCheckedItemRemove}>
          선택삭제
        </Button>
      </S.Fieldset>
    </S.Wrapper>
  );
};

export const NothingInCart = () => <SelectedProductList productCountInCart={0} />;

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

  Nothing: styled.img`
    display: block;
    width: 50%;
    margin: 0 auto;

    @media (max-width: 768px) {
      width: 100%;
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
