function getSelectedCartItemIds(cart) {
  return cart.reduce((acc, cartItem) => {
    cartItem.selected && acc.push(cartItem.id);
    return acc;
  }, []);
}

export default getSelectedCartItemIds;
