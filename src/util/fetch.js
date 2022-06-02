const fetchServer =
  ({ method }) =>
  async ({
    headers = {
      "Content-Type": "application/json",
    },
    url,
    body,
  }) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return response;
  };

export const getBaseServerProductList = fetchServer({ method: "GET" });
export const getBaseServerProductItem = fetchServer({ method: "GET" });

export const getBaseServerCartList = fetchServer({ method: "GET" });
export const postBaseServerCartItem = fetchServer({ method: "POST" });
export const deleteBaseServerCartItem = fetchServer({ method: "DELETE" });
export const patchBaseServerCartItem = fetchServer({ method: "PATCH" });

export const registerBaseServer = fetchServer({ method: "POST" });
export const loginBaseServer = fetchServer({ method: "POST" });
export const deleteUserBaseServer = fetchServer({ method: "POST" });
export const updateUserBaseServer = fetchServer({ method: "PUT" });
