import { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ProductItemComponent from '../../components/main/ProductItem';
import { PRODUCT_LIST_URL } from '../../constants/url';
import { useFetchData } from '../../hooks/useFetchData';
import productList from '../../mock/productList.json';
import { productListState, serverState } from '../../recoil';
import { Product } from '../../types';

const meta = {
  component: ProductItemComponent,
  title: 'Components/Main/ProductItem',
  tags: ['autodocs'],
  args: {
    id: 1,
    imageUrl: `${productList[0].imageUrl}`,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  argTypes: {
    id: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 고유한 `id`입니다.',
    },

    imageUrl: {
      options: Array.from({ length: 11 })
        .map((_, index) => ({
          [`product${index + 1}`]: productList[index].imageUrl,
        }))
        .reduce((acc, cur) => {
          return { ...acc, ...cur };
        }, {}),
      control: {
        type: 'select',
      },
      description: '상품의 사진을 바꿀 수 있습니다.',
    },

    name: {
      description: '상품의 이름을 설정할 수 있습니다.',
    },

    price: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 가격을 설정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof ProductItemComponent>;

export default meta;

export const ProductItem = (args: Product) => {
  const { api } = useFetchData();
  const setProductList = useSetRecoilState(productListState);
  const server = useRecoilValue(serverState);
  useEffect(() => {
    api.get(`${server}${PRODUCT_LIST_URL}`).then((data) => {
      setProductList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  return <ProductItemComponent {...args} />;
};
