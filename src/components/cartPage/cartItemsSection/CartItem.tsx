import styled from 'styled-components';
import { CheckBox } from '../../../layout/checkBox/CheckBox';
import { Counter } from '../../../layout/counter/Counter';
import { useSelectedCartRecoil } from '../../../hooks/recoil/useSelectedCartRecoil';
import { useRecoilValue } from 'recoil';
import { cartItemsState } from '../../../recoil/atoms/cartAtom';
import { useCartItem } from '../../../hooks/cartPage/useCartItem';

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

  const { getIsSelectedCartIdListIncludes } = useSelectedCartRecoil();

  const { handleChangeQuantity, handleClickCheckBox, handleDeleteCartItem } =
    useCartItem(cartId, name);

  return (
    <Style.Container>
      <Style.Content>
        <CheckBox
          isChecked={getIsSelectedCartIdListIncludes(cartId)}
          handleClickCheckBox={handleClickCheckBox}
          id={productId}
        />
        <Style.ProductImage src={imageUrl} alt={name} />
        <Style.ProductSelectorContainer>
          <Style.ProductNameAndDeleteButtonContainer>
            <Style.ProductName>{name}</Style.ProductName>
            <Style.DeleteIcon
              src={`${process.env.PUBLIC_URL}/trashCan.png`}
              onClick={handleDeleteCartItem}
            />
          </Style.ProductNameAndDeleteButtonContainer>
          <Counter
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
    width: 740px;
    height: 200px;

    display: flex;
    align-items: flex-end;

    &:not(:last-child) {
      border-bottom: 1.5px solid #aaaaaa;
    }

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
  Content: styled.div`
    width: 740px;
    height: 174px;

    display: flex;
    gap: 15px;

    @media screen and (max-width: 480px) {
      width: 90vw;
      gap: 10px;
    }
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  ProductImage: styled.img`
    width: 144px;
    height: 147px;

    @media screen and (max-width: 480px) {
      width: 100px;
      height: 100px;

      border-radius: 15px;
    }
  `,
  ProductName: styled.div`
    /* width: 500px; */

    font-size: 20px;
    color: #333333;

    @media screen and (max-width: 480px) {
      width: fit-content;
      font-size: 15px;
    }
  `,
  ProductSelectorContainer: styled.div`
    width: calc(740px - 28px - 144px - 30px);
    height: 147px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    @media screen and (max-width: 480px) {
      width: calc(90vw - 28px - 100px - 30px);
    }
  `,
  ProductNameAndDeleteButtonContainer: styled.div`
    width: calc(740px - 28px - 144px - 30px);
    display: flex;
    align-items: center;

    justify-content: space-between;

    @media screen and (max-width: 480px) {
      width: calc(90vw - 28px - 100px - 30px);
    }
  `,
  DeleteIcon: styled.img`
    width: 30px;
    height: 30px;

    cursor: pointer;

    @media screen and (max-width: 480px) {
      width: 25px;
      height: 25px;
    }
  `,
  ProductPrice: styled.span`
    font-size: 20px;
  `,
};
