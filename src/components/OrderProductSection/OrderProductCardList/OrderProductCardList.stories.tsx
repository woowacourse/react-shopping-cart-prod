import { Meta, StoryObj } from '@storybook/react';
import OrderProductCardList from './OrderProductCardList';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-top: 80px;
`;

const meta = {
  component: OrderProductCardList,
  title: 'OrderProductCardList',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof OrderProductCardList>;

export default meta;
type Story = StoryObj<typeof OrderProductCardList>;

export const Default: Story = {
  render: () => <OrderProductCardList />,
};
