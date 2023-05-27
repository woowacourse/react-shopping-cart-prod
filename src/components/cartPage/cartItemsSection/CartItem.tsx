import styled from 'styled-components';
import { CheckBox } from '../../../layout/checkBox/CheckBox';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { Counter } from '../../../layout/counter/Counter';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';
import { useSelectedCartRecoil } from '../../../hooks/recoil/useSelectedCartRecoil';
import { useRecoilValue } from 'recoil';
import { cartItemsState } from '../../../recoil/atoms/cartAtom';

interface ProductSelectItemProps {
  cartId: number;
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const CartItem = ({
  cartId,
  productId,
  name,
  price,
  imageUrl,
}: ProductSelectItemProps) => {
  const cartItems = useRecoilValue(cartItemsState);
  const initialQuantity =
    cartItems.find((cartItem) => cartItem.id === cartId)?.quantity ?? 1;

  const { deleteRecoilCartById, patchRecoilCartItemQuantity } = useCartRecoil();
  const {
    getIsSelectedCartIdListIncludes,
    addNewSelectedCartId,
    deleteSelectedCartId,
  } = useSelectedCartRecoil();

  const { deleteCartItemById, patchCartItemQuantity } = useCartFetch();

  const handleDeleteCartItem = () => {
    // eslint-disable-next-line no-restricted-globals
    const isUserWantToDeleteProduct = confirm(`${name}을 삭제하시겠습니까?`);

    if (!isUserWantToDeleteProduct) return;

    deleteCartItemById(cartId);
    deleteRecoilCartById(cartId);
  };

  const handleClickCheckBox: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.checked) return addNewSelectedCartId(cartId);

    deleteSelectedCartId(cartId);
  };

  const handleChangeQuantity = (quantity: number) => {
    if (quantity <= 0) return handleDeleteCartItem();

    patchRecoilCartItemQuantity(cartId, quantity);
    patchCartItemQuantity(cartId, quantity);
  };

  return (
    <Style.Container>
      <Style.Content>
        <CheckBox
          isChecked={getIsSelectedCartIdListIncludes(cartId)}
          handleClickCheckBox={handleClickCheckBox}
          id={productId}
        />
        <Style.ProductImage src={imageUrl} alt={name} />
        <Style.ProductName>{name}</Style.ProductName>
        <Style.ProductSelectorContainer>
          <Style.DeleteIcon
            src={`${process.env.PUBLIC_URL}/trashCan.png`}
            onClick={handleDeleteCartItem}
          />
          <Counter
            width="110px"
            height="48px"
            quantity={initialQuantity}
            onQuantityChange={handleChangeQuantity}
          />
          <Style.ProductPrice>{price}원</Style.ProductPrice>
        </Style.ProductSelectorContainer>
      </Style.Content>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 100%;
    height: 200px;

    display: flex;
    align-items: flex-end;

    &:not(:last-child) {
      border-bottom: 1.5px solid #aaaaaa;
    }
  `,
  Content: styled.div`
    width: 100%;
    height: 174px;

    display: flex;
    gap: 15px;
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  ProductImage: styled.img`
    width: 144px;
    height: 147px;
  `,
  ProductName: styled.div`
    flex-grow: 1;
    font-size: 20px;
    color: #333333;
  `,
  ProductSelectorContainer: styled.div`
    min-width: 114px;
    height: 147px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 23px;
  `,
  DeleteIcon: styled.img`
    width: 24px;
    height: 24px;

    cursor: pointer;
  `,
  ProductPrice: styled.span`
    font-size: 16px;
  `,
};
