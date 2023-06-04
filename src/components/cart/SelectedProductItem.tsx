import { useRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { useSetCart } from '../../hooks/useCart';
import { selectedCartItems } from '../../recoil';
import { Product } from '../../types';
import Button from '../common/Button';
import { Checkbox } from '../common/CheckboxStyle';
import TrashCanIcon from '../icons/TrashCanIcon';
import Price from '../Price';
import QuantityButton from './QuantityButton';

type SelectedProductItemProps = Product & {
  quantity: number;
  productId: number;
};

const SelectedProductItem = ({
  id: cartItemId,
  productId,
  imageUrl,
  name,
  price,
  quantity,
}: SelectedProductItemProps) => {
  const { removeItemFromCart } = useSetCart(productId);
  const [checkedItems, setCheckedItems] = useRecoilState(selectedCartItems);

  const isSelected = checkedItems.includes(cartItemId);

  const handleCheckedItem = () => {
    setCheckedItems([cartItemId]);
  };

  const handleTrashCanClick = () => {
    setCheckedItems([cartItemId]);
    removeItemFromCart();
  };

  return (
    <div>
      <Fieldset>
        <Checkbox
          type="checkbox"
          id={`${cartItemId}-checkbox`}
          name={name}
          checked={isSelected}
          onChange={handleCheckedItem}
        />
        <Image src={`${imageUrl}`} alt={name} />
        <Label htmlFor={`${cartItemId}-checkbox`} title={name}>
          {name}
        </Label>
        <S.Wrapper>
          <Button css={trashCanButtonStyle} onClick={handleTrashCanClick}>
            <TrashCanIcon patternId={cartItemId} imageSize={{ width: '40', height: '40' }} />
          </Button>
          <QuantityButton productId={productId} min={1} max={10} />
          <Price price={price * quantity} />
        </S.Wrapper>
      </Fieldset>
    </div>
  );
};

const Fieldset = styled.fieldset`
  display: flex;
  margin: 28px 10px 0 0;
  padding-bottom: 32px;
  border-bottom: 1.5px solid #ccc;

  @media (max-width: 420px) {
    flex-wrap: wrap;
    margin-right: 0;
  }
`;

const Image = styled.img`
  width: 144px;
  margin-right: 20px;

  @media (max-width: 548px) {
    margin-right: 8px;
  }

  @media (max-width: 420px) {
    width: 100%;
    margin: 10px 0 0;
  }
`;

const Label = styled.label`
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
`;

const S = {
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

const trashCanButtonStyle = css`
  background: none;
`;

export default SelectedProductItem;
