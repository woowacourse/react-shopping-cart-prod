function getSelectedCartItemIds(cart) {
  return cart
    .filter((cartItem) => cartItem.selected)
    .map((cartItem) => cartItem.id);
}

export default getSelectedCartItemIds;
