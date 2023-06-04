import { Meta, StoryObj } from '@storybook/react';
import CartProductSection from './CartProductSection';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-top: 80px;
`;

const meta = {
  component: CartProductSection,
  title: 'CartProductSection',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CartProductSection>;

export default meta;
type Story = StoryObj<typeof CartProductSection>;

export const Default: Story = {
  render: () => <CartProductSection />,
};
