import useCart from 'hooks/useCart';
import useAuth from 'hooks/useAuth';
import { includes } from 'utils';
import { useMemo, useState, useEffect } from 'react';

const useCartPage = () => {
  const { isLoading, isError, cartItems, getItems, deleteItems } = useCart();
  const { checkIsAuthenticated } = useAuth();

  const [selectedItemList, setSelectedItemList] = useState([]);

  const totalPrice = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return 0;
    const selectedItems = cartItems.filter(({ id }) =>
      includes(selectedItemList, id),
    );
    return selectedItems.reduce(
      (prev, { price, quantity }) => (prev += price * quantity),
      0,
    );
  }, [cartItems, selectedItemList]);

  const handleToggleSelectAll = (isSelected) => () => {
    if (isSelected) {
      setSelectedItemList([]);
      return;
    }
    setSelectedItemList(cartItems.map(({ id }) => id));
  };

  const handleToggleSelect = (id) => () => {
    if (!includes(selectedItemList, id)) {
      setSelectedItemList([...selectedItemList, id]);
      return;
    }
    setSelectedItemList(selectedItemList.filter((itemId) => itemId !== id));
  };

  const handleDeleteSelectedItem = () => {
    deleteItems(selectedItemList);
    setSelectedItemList([]);
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  useEffect(() => {
    setSelectedItemList(cartItems ? cartItems.map(({ id }) => id) : []);
  }, [cartItems]);

  useEffect(() => {
    if (!cartItems) {
      getItems();
    }
  }, []);

  return {
    isLoading,
    isError,
    cartItems,
    totalPrice,
    selectedItemList,
    handleToggleSelectAll,
    handleToggleSelect,
    handleDeleteSelectedItem,
  };
};

export default useCartPage;
