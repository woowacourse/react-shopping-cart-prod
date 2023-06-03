import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import useCartCheckBox from 'hooks/useCartCheckBox';
import useCheckOutPointCostContext from 'hooks/useContext/useCheckOutPointCostContext';
import { postOrder } from 'apis/orders';
import { getCartProducts } from 'apis/cart';
import ROUTE_PATH from 'constants/routePath';

const useOrder = () => {
  const { checkedCartProductIds } = useCartCheckBox();
  const { pointCost } = useCheckOutPointCostContext();
  const setCartProducts = useSetRecoilState(cartProductsState);
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      await postOrder([...checkedCartProductIds], pointCost);
    } catch (error) {
      console.error(error);
      alert('상품을 주문하지 못했어요. 다시 시도해주세요');
      return;
    }
  };

  const handleCreateOrder = async () => {
    await createOrder();
    setCartProducts(await getCartProducts());
    navigate(ROUTE_PATH.ORDER_LIST);
  };

  return { handleCreateOrder };
};

export default useOrder;
