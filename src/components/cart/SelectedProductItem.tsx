import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { useCart } from '../../hooks/useCart';
import { checkedItemList } from '../../recoil';
import { Cart } from '../../types';
import Button from '../common/Button';
import TrashCanIcon from '../icons/TrashCanIcon';
import Price from '../Price';
import QuantityButton from '../QuantityButton';
import { Checkbox } from './CheckboxStyle';

interface Props extends Cart {
  productId: number;
}

const SelectedProductItem = ({
  id: cartItemId,
  productId,
  imageUrl,
  name,
  price,
  quantity,
}: Props) => {
  const { removeItemFromCart } = useCart(productId);
  const [checkedItemIdList, setCheckedItemIdList] = useRecoilState(checkedItemList);

  const isChecked = checkedItemIdList.includes(cartItemId);

  const handleCheckedItemToggle = () => {
    if (isChecked) return setCheckedItemIdList((prev) => prev.filter((id) => id !== cartItemId));

    setCheckedItemIdList((prev) => [...prev, cartItemId]);
  };

  const handleItemRemove = () => {
    setCheckedItemIdList((prev) => prev.filter((id) => id !== cartItemId));
    removeItemFromCart();
  };

  return (
    <div>
      <S.Fieldset>
        <Checkbox
          type='checkbox'
          id={`${cartItemId}-checkbox`}
          name='checkbox-in-cart'
          checked={isChecked}
          onChange={handleCheckedItemToggle}
        />
        <S.Image src={`${imageUrl}`} alt={name} loading='lazy' />
        <S.Name htmlFor={`${cartItemId}-checkbox`} title={name}>
          {name}
        </S.Name>
        <S.Wrapper>
          <Button onClick={handleItemRemove}>
            <TrashCanIcon patternId={cartItemId} imageSize={{ width: '40', height: '40' }} />
          </Button>
          <QuantityButton productId={productId} quantity={quantity} />
          <Price value={price * quantity} />
        </S.Wrapper>
      </S.Fieldset>
    </div>
  );
};

const S = {
  Fieldset: styled.fieldset`
    display: flex;
    margin-top: 28px;
    padding-bottom: 32px;
    border-bottom: 1.5px solid #ccc;

    @media (max-width: 420px) {
      flex-wrap: wrap;
    }
  `,

  Image: styled.img`
    width: 144px;
    margin-right: 20px;

    @media (max-width: 548px) {
      margin-right: 8px;
    }

    @media (max-width: 420px) {
      width: 100%;
      margin: 10px 0 0;
    }
  `,

  Name: styled.label`
    display: -webkit-box;
    height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 16px;

    @media (max-width: 548px) {
      height: 14px;
      font-size: 14px;
    }

    @media (max-width: 420px) {
      height: 16px;
      margin: 16px auto;
      font-size: 16px;
    }
  `,

  Wrapper: styled.div`
    display: flex;
    gap: 32px;
    flex-direction: column;
    align-items: end;
    margin-left: auto;

    @media (max-width: 420px) {
      width: 100%;
      flex-direction: column-reverse;
      align-items: center;
    }
  `,
};

export default SelectedProductItem;
