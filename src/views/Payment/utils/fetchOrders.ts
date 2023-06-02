interface generateFetchOrdersParams {
  resource: string;
  credential: string;
}

const generateFetchOrders = ({ resource, credential }: generateFetchOrdersParams) => {
  return {
    getOrders: () => {
      return fetch(resource, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credential}`,
        },
      });
    },
    getOrder: (orderId: number) => {
      return fetch(`${resource}/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credential}`,
        },
      });
    },

    postOrder: (bodyContent: { orderItemIds: number[]; couponId?: number }) => {
      console.log('>>> bodyContent:', JSON.stringify(bodyContent));
      return fetch(resource, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credential}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bodyContent,
        }),
      });
    },
  };
};

export default generateFetchOrders;
