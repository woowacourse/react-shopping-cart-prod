import { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  height: 100%;
`;

const meta = {
  component: ProductCard,
  title: 'ProductCard',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof ProductCard>;

const product = {
  id: 13,
  name: '양상추 1개',
  price: 3900,
  imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5bf92975-ffe4-4758-b131-52d561402e7b.jpg?h=300&w=300',
};

export const Default: Story = {
  render: () => <ProductCard product={product} />,
};
