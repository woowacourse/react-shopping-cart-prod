import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useOrderFetch = () => {
  const navigation = useNavigate();

  const fetchAddOrderData = useMutation(
    async ({ body }: { body?: object }) => {
      const res = await fetch(`/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return res;
    },
    {
      onSuccess: async (res) => {
        const orderLocation = res.headers.get('Location');
        navigation(`/${orderLocation}`);
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const addOrderDataAPI = (body?: object) => {
    fetchAddOrderData.mutate({ body });
  };

  return { addOrderDataAPI };
};

export default useOrderFetch;
