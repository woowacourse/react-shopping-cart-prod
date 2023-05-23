const DEV_BASE_URL =
  "http://cors-anywhere.herokuapp.com/http://13.209.73.130:8080";
const username = "a@a.com";
const password = "1234";

// Base64로 인코딩
const base64 = btoa(username + ":" + password);

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${DEV_BASE_URL}/products`, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCartItems = async () => {
  try {
    const response = await fetch(`${DEV_BASE_URL}/cart-items`, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changeQuantity = async (
  cartItemId: number,
  newQuantity: number
) => {
  try {
    await fetch(`/cart-items/${cartItemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity: newQuantity }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCartItem = async (productId: number) => {
  try {
    await fetch("/cart-items", {
      method: "POST",
      body: JSON.stringify({ productId: productId }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    await fetch(`/cart-items/${cartItemId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};
