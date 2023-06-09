import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';
import ExampleProduct from '../assets/images/example-product.jpg';
import OrderCartItem from './OrderCartItem';

const Container = styled.div`
  height: 220px;
`;

const meta = {
  title: 'OrderCartItem',
  component: OrderCartItem,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof OrderCartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productName: '친환경 실링용기-ECO 19153',
    productPrice: 180600,
    quantity: 3,
    imageUrl: ExampleProduct,
  },
};
