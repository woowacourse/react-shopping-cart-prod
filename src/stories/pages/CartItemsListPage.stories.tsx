import { Meta, StoryObj } from '@storybook/react';

import CartItemListPage from '../../pages/CartItemListPage';
import { userEvent, waitFor, within } from '@storybook/testing-library';

const meta = {
  title: 'Pages/CartProductsListPage',
  component: CartItemListPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CartItemListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// export const Interaction: Story = {
//   args: {
//     totalCartProductCount: 5,
//     checkedCartProductCount: 3,
//   },

//   play: async ({ canvasElement, step }) => {
//     window.localStorage.clear();

//     const canvas = within(canvasElement);

//     const productList = await canvas.findByRole('list');

//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//     // await step('Click Cart Button', async () => {
//     //   await userEvent.click(checkboxes[0]);
//     // });

//     // await waitFor(() => {});
//     await waitFor(() => {
//       const checkedCheckboxes = document.querySelectorAll(
//         'input[type="checkbox"]:checked'
//       );
//       expect(checkedCheckboxes.length).toBe(checkedCartProductCount);
//     });
//   },
// };
