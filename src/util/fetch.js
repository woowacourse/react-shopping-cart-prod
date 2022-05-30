const fetchServer =
  ({ method, headers }) =>
  async ({ url, body }) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return response;
  };

export const getBaseServerProductList = fetchServer({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
export const getBaseServerProductItem = fetchServer({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBaseServerCartList = fetchServer({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
export const postBaseServerCartItem = fetchServer({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
export const deleteBaseServerCartItem = fetchServer({
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
});
export const patchBaseServerCartItem = fetchServer({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
});
