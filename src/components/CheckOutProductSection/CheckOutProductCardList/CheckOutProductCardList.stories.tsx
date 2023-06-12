import { Meta, StoryObj } from '@storybook/react';
import CheckOutProductCardList from './CheckOutProductCardList';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-top: 80px;
`;

const meta = {
  component: CheckOutProductCardList,
  title: 'checkout-page/CheckOutProductCardList',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CheckOutProductCardList>;

export default meta;
type Story = StoryObj<typeof CheckOutProductCardList>;

export const Default: Story = {
  render: () => <CheckOutProductCardList />,
};
