import { Meta, StoryObj } from '@storybook/react';
import CartProductCardList from './CartProductCardList';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
`;

const meta = {
  component: CartProductCardList,
  title: 'CartProductCardList',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CartProductCardList>;

export default meta;
type Story = StoryObj<typeof CartProductCardList>;

export const Default: Story = {
  render: () => <CartProductCardList />,
};
