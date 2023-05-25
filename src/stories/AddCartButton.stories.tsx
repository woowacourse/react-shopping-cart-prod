import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCartButton from '../components/AddCartButton';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof AddCartButton>;
const meta: Meta<typeof AddCartButton> = {
  title: 'Common/AddCartButton',
  component: AddCartButton,
};
export default meta;

export const Default: Story = {
  args: {
    product: {
      id: 2,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const CartButton = canvas.getByRole('button');
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    userEvent.click(CartButton);
  },
};
