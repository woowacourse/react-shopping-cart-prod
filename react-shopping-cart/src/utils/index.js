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
