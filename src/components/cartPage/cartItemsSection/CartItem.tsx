import styled from 'styled-components';
import { CheckBox } from '../../../layout/checkBox/CheckBox';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { Counter } from '../../../layout/counter/Counter';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';
import { useSelectedCartRecoil } from '../../../hooks/recoil/useSelectedCartRecoil';
import { useRecoilValue } from 'recoil';
import { cartItemsState } from '../../../recoil/atoms/cartAtom';
import { getCommaAddedNumber } from '../../../utils/number';

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
            src={`${process.env.PUBLIC_URL}/assets/trashCan.png`}
            onClick={handleDeleteCartItem}
          />
          <Counter
            width="90px"
            height="40px"
            quantity={initialQuantity}
            onQuantityChange={handleChangeQuantity}
          />
          <Style.ProductPrice>
            {getCommaAddedNumber(price)}원
          </Style.ProductPrice>
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

    & {
      border-bottom: 1.5px solid #aaaaaa;
    }
  `,
  Content: styled.div`
    width: 100%;
    height: 174px;

    display: flex;
    gap: 20px;
    padding: 0 10px;

    @media (max-width: 480px) {
      gap: 10px;
    }
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;

    @media (max-width: 480px) {
      width: 20px;
      height: 20px;
    }
  `,
  ProductImage: styled.img`
    width: 144px;
    height: 147px;

    border-radius: 8px;

    @media (max-width: 480px) {
      width: 68px;
      height: 69px;
    }
  `,
  ProductName: styled.div`
    flex-grow: 1;
    font-size: 20px;
    color: #333333;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  `,
  ProductSelectorContainer: styled.div`
    min-width: 114px;
    height: 147px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 23px;

    @media (max-width: 480px) {
      min-width: 20px;
      height: 120px;
    }
  `,
  DeleteIcon: styled.img`
    width: 24px;
    height: 24px;

    cursor: pointer;
  `,
  ProductPrice: styled.span`
    font-size: 24px;

    @media (max-width: 480px) {
      font-size: 18px;
    }
  `,
};
