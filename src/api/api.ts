export const fetchAddCart = async (url: string, id: number) => {
  const response = await fetch(`${url}/cart-items`, {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
  });
  const result = await response.json();
  console.log(result);
};

export const fetchDeleteCart = async (url: string, id: number) => {
  const response = await fetch(`${url}/cart-items/${id}`, {
    method: "DELETE",
  });
  console.log(response);
};

export const fetchUpdateCart = async (url: string, id: number, quantity: number) => {
  const response = await fetch(`${url}/cart-items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
  });
  const result = await response.json();
  console.log(result);
};
