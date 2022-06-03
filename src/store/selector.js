export const isLoggedInSelector = ({ user }) => user.isLoggedIn;
export const nicknameSelector = ({ user }) => user.nickname;

export const productSelector = ({ product }) => product;
export const productCountSelector = ({ product }) => product.pageCount;

export const cartStoreSelector = ({ cart }) => cart;
export const cartObjectSelector = ({ cart }) => cart.cart;
