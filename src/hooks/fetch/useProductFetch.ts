import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { base64 } from '../../constants/user';
export const useProductFetch = () => {
  const apiEndPoint = useRecoilValue(APIAtom);

  const getProductList = async () => {
    const response = await fetch(`${apiEndPoint}/products`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
    const productList = await response.json();

    return productList;
  };

  const getProductDetailById = async (id: number) => {
    const response = await fetch(`${apiEndPoint}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const productDetail = await response.json();

    return productDetail;
  };

  return {
    getProductList,
    getProductDetailById,
  };
};
