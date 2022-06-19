const findCartIdByIndex = (cartId, cartList) => cartList.findIndex(({ id }) => id === cartId);

export { findCartIdByIndex };
