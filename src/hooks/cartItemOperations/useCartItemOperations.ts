import useAddToCartButton from './useAddToCartButton.ts';
import useStepperInputChange from './useStepperInputChange.ts';
import useStepperButtons from './useStepperButtons.ts';

type CartItemOperations = {
  cartItemNumber: number | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  refetchCartList: () => void;
};

const useCartItemOperations = ({ cartItemNumber, id, name, price, imageUrl, refetchCartList }: CartItemOperations) => {
  const addToCartButton = useAddToCartButton({ cartItemNumber, id, name, price, imageUrl, refetchCartList });
  const stepperInputChange = useStepperInputChange({ cartItemNumber, id, name, price, imageUrl, refetchCartList });
  const stepperButtons = useStepperButtons({ cartItemNumber, id, name, price, imageUrl, refetchCartList });

  return {
    ...addToCartButton,
    ...stepperInputChange,
    ...stepperButtons,
  };
};

export default useCartItemOperations;
