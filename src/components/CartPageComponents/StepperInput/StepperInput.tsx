import * as Styled from './StepperInput.styles.tsx';
import { Item } from '../../../types/CartList.ts';
import useCartItemOperations from '../../../hooks/cartItemOperations/useCartItemOperations.ts';

type StepperInputProps = {
  initialValue: number;
  cartItem: Item;
  refetchCartList: ({}) => void;
};

const StepperInput = ({ cartItem, refetchCartList }: StepperInputProps) => {
  const { handleStepperIncreaseButton, handleStepperDecreaseButton } = useCartItemOperations({
    cartItemNumber: cartItem.id,
    id: cartItem.product.id,
    name: cartItem.product.name,
    price: cartItem.product.price,
    imageUrl: cartItem.product.imageUrl,
    refetchCartList,
  });

  return (
    <Styled.StepperInputWrapper>
      <Styled.Input type='text' value={cartItem.quantity} />
      <Styled.ButtonWrapper>
        <Styled.Button onClick={() => handleStepperIncreaseButton(cartItem.quantity)}>+</Styled.Button>
        <Styled.Button onClick={() => handleStepperDecreaseButton(cartItem.quantity)}>-</Styled.Button>
      </Styled.ButtonWrapper>
    </Styled.StepperInputWrapper>
  );
};

export default StepperInput;
