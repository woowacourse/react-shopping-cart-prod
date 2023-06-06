import { styled } from 'styled-components';
import { SetterOrUpdater } from 'recoil';
import { CartItemInfo } from '../../types';
import { PRODUCT } from '../../constants';
import { useCart } from '../../hooks/useCart';
import { TrashCanIcon } from '../../assets/svg';
import Stepper from '../Stepper';
import Checkbox from '../common/Checkbox';
import Price from '../common/Price';

interface Props {
  cartItemInfo: CartItemInfo;
  checkedItemIds: number[];
  setCheckedItemIds: SetterOrUpdater<number[]>;
}

export default function CartItem({ cartItemInfo, checkedItemIds, setCheckedItemIds }: Props) {
  const { id: productId, name, price, imageUrl } = cartItemInfo.product;
  const { updateProductQuantity, deleteFromCart } = useCart();

  const toggleCheckbox = (id: number) => {
    if (checkedItemIds.includes(id)) {
      setCheckedItemIds((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }

    setCheckedItemIds((prev) => [...prev, id]);
  };

  const deleteCartItem = () => {
    setCheckedItemIds((prev) => prev.filter((itemId) => itemId !== cartItemInfo.id));
    deleteFromCart(cartItemInfo.id);
  };

  return (
    <Style.Container>
      <Style.CheckBoxWrapper>
        <Checkbox
          id={`${name}-checkbox`}
          checked={checkedItemIds.includes(cartItemInfo.id)}
          itemId={cartItemInfo.id}
          toggleCheckbox={toggleCheckbox}
        />
      </Style.CheckBoxWrapper>
      <Style.ProductAndStepperContainer>
        <Style.ImageAndNameContainer>
          <Style.ProductImageWrapper>
            <Style.ProductImage src={imageUrl} alt={name} className="skeleton" />
          </Style.ProductImageWrapper>
          <Style.ProductName htmlFor={`${name}-checkbox`}>{name}</Style.ProductName>
        </Style.ImageAndNameContainer>
        <Style.TrashCanIConAndStepperAndPriceContainer>
          <Style.DeleteCartItemButton
            onClick={deleteCartItem}
            aria-label={`장바구니에서 ${name} 상품 삭제`}
          >
            <TrashCanIcon />
          </Style.DeleteCartItemButton>
          <Stepper
            quantity={cartItemInfo.quantity}
            minQuantity={1}
            maxQuantity={PRODUCT.MAX_COUNT}
            updateQuantity={(quantity: number) => updateProductQuantity(productId, quantity)}
          />
          <Price
            price={price * cartItemInfo?.quantity}
            label={`${name} ${cartItemInfo.quantity}개`}
          />
        </Style.TrashCanIConAndStepperAndPriceContainer>
      </Style.ProductAndStepperContainer>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      /* flex-direction: column; */
      position: relative;
    }
  `,

  CheckBoxWrapper: styled.div`
    margin-right: 20px;
    border-radius: 2px;
  `,

  ProductAndStepperContainer: styled.div`
    display: flex;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
  `,

  ImageAndNameContainer: styled.div`
    display: flex;
  `,

  ProductImageWrapper: styled.div`
    width: 130px;
    height: 130px;

    position: relative;
    overflow: hidden;
    margin-right: 20px;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 100px;
      height: 100px;
    }
  `,

  ProductImage: styled.img`
    width: 100%;
    height: 100%;

    position: absolute;
    object-fit: cover;
  `,

  ProductName: styled.label`
    width: 135px;

    font-size: 18px;
    color: var(--grey-400);

    cursor: pointer;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 308px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 105px;
      margin-right: 25px;

      font-size: 14px;
    }
  `,

  TrashCanIConAndStepperAndPriceContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    width: 170px;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: none;

      width: 250px;
      margin-top: 20px;
    }
  `,

  DeleteCartItemButton: styled.button`
    all: unset;

    cursor: pointer;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      position: absolute;
      top: 0;
      right: 0;
    }
  `,
};
