export function withOpacityValue(hexCode, opacity) {
  const red = hexCode.substring(1, 3);
  const green = hexCode.substring(3, 5);
  const blue = hexCode.substring(5);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

export function addQuantityData(cartItem, data) {
  const productData = data.find(datum => cartItem.id === datum.id);
  return { ...productData, quantity: cartItem.quantity };
}

export function calculatePrice(carts, orderList) {
  const orderItemInfoList = carts?.filter(cartItem => orderList.includes(cartItem.productId));

  return orderItemInfoList?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
}

export function processServerData(userInfo) {
  return Object.entries(userInfo).reduce((acc, [key, value]) => {
    if (key === 'phone') {
      return { ...acc, phone: `010-${value.first}-${value.second}` };
    }
    return { ...acc, [key]: value.value };
  }, {});
}

export function processClientData(serverUserInfo, initialUserInfoState) {
  return Object.entries(serverUserInfo).reduce(
    (acc, [key, value]) => {
      if (key === 'email') {
        return { ...acc, [key]: { value, error: false, disabled: true } };
      }
      if (key === 'phone') {
        const [_, first, second] = value.split('-');
        return { ...acc, [key]: { first, second } };
      }
      return { ...acc, [key]: { value, error: false } };
    },
    { ...initialUserInfoState }
  );
}

export const enterSubmit = (e, condition, cb) => {
  if (condition) {
    return;
  }

  if (e.nativeEvent.key === 'Enter') {
    cb();
  }
};
