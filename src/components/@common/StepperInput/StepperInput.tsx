import { useState, useEffect } from 'react';
import useCartItemOperations from '../../../hooks/cartItemOperations/useCartItemOperations.ts';
import * as Styled from './StepperInput.styles.tsx';
import { Item } from '../../../types/CartList.ts';
import { NUMERIC_REGEXP } from '../../../constants/REGEX.ts';

type StepperInputProps = {
  initialValue: number;
  cartItem: Item;
  refetchCartList: ({}) => void;
  width: number;
};

const StepperInput = ({ cartItem, refetchCartList, width }: StepperInputProps) => {
  const { handleStepperInputChange, handleStepperIncreaseButton, handleStepperDecreaseButton } = useCartItemOperations({
    cartItemNumber: cartItem.id,
    id: cartItem.product.id,
    name: cartItem.product.name,
    price: cartItem.product.price,
    imageUrl: cartItem.product.imageUrl,
    refetchCartList,
  });

  const [inputValue, setInputValue] = useState(String(cartItem.quantity));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || NUMERIC_REGEXP.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue === '') {
      setInputValue('1');
    }
    handleStepperInputChange(event);
  };

  useEffect(() => {
    setInputValue(String(cartItem.quantity));
  }, [cartItem.quantity]);

  return (
    <Styled.StepperInputWrapper>
      <Styled.Input type='text' value={inputValue} onChange={handleInputChange} onBlur={handleBlur} width={width} />
      <Styled.ButtonWrapper>
        <Styled.Button onClick={() => handleStepperIncreaseButton(cartItem.quantity)}>+</Styled.Button>
        <Styled.Button onClick={() => handleStepperDecreaseButton(cartItem.quantity)}>-</Styled.Button>
      </Styled.ButtonWrapper>
    </Styled.StepperInputWrapper>
  );
};

export default StepperInput;
