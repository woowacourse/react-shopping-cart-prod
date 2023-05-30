import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import MainPage from '../../pages/MainPage';
import { Header } from '../components/common/Header.stories';

const meta = {
  title: 'Pages/MainPage',
  decorators: [
    (Story) => (
      <>
        <Header title='STORE' />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof MainPage>;

export default meta;

type Story = StoryObj<typeof meta>;

const pause = () => new Promise((resolve) => setTimeout(resolve, 2000));

export const SuccessInteraction: Story = {
  render: () => <MainPage />,

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    localStorage.clear();

    const purchaseProduct = (productOrder: number) => {
      const allCartIconButtons = canvas.getAllByLabelText('장바구니에 담기');
      const selectedCartIconButton = allCartIconButtons[productOrder];

      expect(selectedCartIconButton).toBeVisible();

      return selectedCartIconButton;
    };

    await pause();

    await step('Purchase Product', async () => {
      await waitFor(() => {
        localStorage.clear();

        const secondCartIconButton = purchaseProduct(1);

        userEvent.click(secondCartIconButton);
      });
    });

    await pause();

    await step('Raise Quantity', async () => {
      const quantity = screen.getByLabelText('상품 개수 : 1개');

      expect(quantity).toBeInTheDocument();

      const quantityButton = screen.getByLabelText('상품 수량 1개 더하기');

      userEvent.click(quantityButton);

      await waitFor(() => {
        const raisedQuantity = screen.getByLabelText('상품 개수 : 2개');

        expect(raisedQuantity).toBeInTheDocument();
      });
    });

    await pause();

    await step('Purchase Another Product', async () => {
      window.scrollTo({ top: 900, behavior: 'smooth' });

      await waitFor(() => {
        const ninthCartIconButton = purchaseProduct(7);

        userEvent.click(ninthCartIconButton);
      });
    });

    await pause();

    await step('Purchase Another Product', async () => {
      await waitFor(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      await waitFor(() => {
        const firstCartIcon = purchaseProduct(0);

        userEvent.click(firstCartIcon);
      });
    });

    await pause();

    await step('Cancel Purchasing Product', async () => {
      await waitFor(() => {
        const quantityButton = screen.getAllByLabelText('상품 수량 1개 줄이기');
        const firstButton = quantityButton[0];

        expect(firstButton).toBeInTheDocument();

        userEvent.click(firstButton);

        const allCartIconButtons = canvas.getAllByLabelText('장바구니에 담기');
        const firstCartIcon = allCartIconButtons[0];

        expect(firstCartIcon).toBeInTheDocument();
      });
    });

    localStorage.clear();
  },
};
