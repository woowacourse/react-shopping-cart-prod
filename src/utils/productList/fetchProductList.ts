import { fetchGet } from '@utils/fetchUtils';
import { ServerName, getProductPath } from '@constants/serverUrlConstants';
import { UserInformationType } from '@constants/userConstant';
import { ServerProductItemType } from '@type/productType';
import { productListApiWrapper } from './productList';

interface GetProductListProps {
  serverName: ServerName;
  userInfo: UserInformationType;
}

export const getProductListApi = async ({ serverName, userInfo }: GetProductListProps) => {
  const serverProductList = await fetchGet<ServerProductItemType[]>(getProductPath(serverName), {
    email: userInfo.email,
    password: userInfo.password,
  });
  const clientProductList = productListApiWrapper(serverProductList);

  return clientProductList;
};
