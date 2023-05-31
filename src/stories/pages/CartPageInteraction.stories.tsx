import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { getAllByRole } from '@testing-library/react';
import { Header } from '../components/common/Header.stories';
import { Cart } from '../pages/CartPage.stories';

const meta = {
  title: 'Pages/CartPage',
  decorators: [
    (Story) => (
      <>
        <Header title='STORE' />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Cart>;

export default meta;

type Story = StoryObj<typeof meta>;

const pause = () => new Promise((resolve) => setTimeout(resolve, 2000));

export const SuccessInteraction: Story = {
  render: () => <Cart />,

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const uncheckBox = (boxOrder: number) => {
      const checkboxes = getAllByRole(document.body, 'checkbox');

      userEvent.click(checkboxes[boxOrder]);

      expect(checkboxes[boxOrder]).not.toBeChecked();
    };

    await pause();

    await step('Uncheck Product', async () => {
      await waitFor(() => {
        uncheckBox(2);
      });
    });

    await pause();

    await step('Step down Quantity', async () => {
      await waitFor(() => {
        const quantityButton = canvas.getAllByLabelText('상품 수량 1개 줄이기');
        const secondQuantityStepDownButton = quantityButton[1];

        userEvent.click(secondQuantityStepDownButton);
      });
    });

    await pause();

    await step('Uncheck Product', async () => {
      await waitFor(() => {
        uncheckBox(1);
      });
    });

    await pause();

    await step('Delete Selected Products', async () => {
      await waitFor(() => {
        const deleteButton = canvas.getByText('선택삭제');

        userEvent.click(deleteButton);

        const productsCount = canvas.getByText('든든배송 상품 (2개)');

        expect(productsCount).toBeInTheDocument();
      });
    });

    await pause();

    await step('Check All', async () => {
      await waitFor(() => {
        const allCheckButton = canvas.getByText('전체선택 (0/2)');

        userEvent.click(allCheckButton);

        const checkboxes = getAllByRole(document.body, 'checkbox');

        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeChecked();
        });
      });
    });
  },
};
