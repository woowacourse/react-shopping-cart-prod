import { Meta, StoryObj } from '@storybook/react';
import ProductCardList from './ProductCardList';
import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 60px 0;
  padding: 0 16.66%;

  @media (max-width: 1280px) {
    padding: 0 8.33%;
  }

  @media (max-width: 768px) {
    padding: 0 4.16%;
    margin-top: 20px;
    margin-bottom: 0;
  }
`;

const meta = {
  component: ProductCardList,
  title: 'product-list-page/ProductCardList',
  decorators: [
    (Story) => (
      <MainContainer>
        <Story />
      </MainContainer>
    ),
  ],
} satisfies Meta<typeof ProductCardList>;

export default meta;
type Story = StoryObj<typeof ProductCardList>;

const products = [
  {
    id: 1,
    name: '순살치킨 해마로 1kg 냉동',
    price: 10800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
  },
  {
    id: 2,
    name: '사조오양 치킨텐더 1000gx1개',
    price: 9900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/f9923d11-5ba9-4301-a73c-fc4817544f6a.jpg?h=400&w=400',
  },
  {
    id: 3,
    name: '사세통상 순살치킨가라아게(냉동 1kg/ea)',
    price: 10000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/ca728030-5e96-45f7-aa25-b7ebc0a1de7a.jpg?h=400&w=400',
  },
  {
    id: 4,
    name: '수월한 텐더스틱 10kg, 1kg * 10개',
    price: 86000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/47ea49b2-19c5-4c2b-a98a-7a4c6e9d241a.jpg?h=400&w=400',
  },
  {
    id: 5,
    name: '[먹깨비네] 진주햄 골드 스모크햄 1kgx1개(냉장)',
    price: 6700,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5abcf791-e088-4366-b7ab-72a6bff14032.jpg?h=400&w=400',
  },
  {
    id: 6,
    name: '아워홈 그릴드 치킨브레스트 1kg (냉장)',
    price: 15700,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/20158780-0e9e-4bf4-a845-615caeeed86e.jpg?h=400&w=400',
  },
  {
    id: 7,
    name: '[택배]식자재왕 양념편육 430g',
    price: 11100,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5f74280a-d3f2-4122-8e6c-32f212495183.png?h=400&w=400',
  },
  {
    id: 8,
    name: '상도 닭똥집 튀김 1kg',
    price: 11600,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/76233b02-8544-4adf-b8f6-37c4372050a7.jpg?h=400&w=400',
  },
];

export const Default: Story = {
  render: () => <ProductCardList products={products} />,
};
