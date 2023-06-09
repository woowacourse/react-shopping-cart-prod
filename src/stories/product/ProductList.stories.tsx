import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import ProductList from '../../components/product/ProductList/ProductList';
import ProductListSkeleton from '../../components/product/ProductList/ProductListSkeleton';
import { delay } from '../../utils/delay';

const meta = {
  title: 'ShoppingCart/Product/ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <ProductListSkeleton />,
};

export const Interaction: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    window.localStorage.clear();

    await delay(3000);

    const buyButton = canvas.queryAllByRole('button')[0];

    await step('상품 이미지 위 장바구니 버튼을 누르면 장바구니 아이콘이 사라진다.', async () => {
      await userEvent.click(buyButton);

      await delay(700);

      expect(buyButton).not.toBeVisible();
    });

    const quantityInput = canvas.getByLabelText('카운트 입력');
    const increaseButton = canvas.getByLabelText('카운트 증가');
    const decreaseButton = canvas.getByLabelText('카운트 감소');

    await step(
      '장바구니 아이콘이 사라지면, 현재 장바구니 상품 수량을 알려주는 스텝퍼 버튼이 나타난다.',
      async () => {
        expect(quantityInput).toBeVisible();
        expect(increaseButton).toBeVisible();
        expect(decreaseButton).toBeVisible();
        expect(quantityInput).toHaveValue('1');
      }
    );

    await step('스텝퍼 버튼의 "+" 아이콘을 클릭하면 장바구니 상품 수량이 증가한다.', async () => {
      await userEvent.click(increaseButton);

      await delay(700);

      await userEvent.click(increaseButton);

      expect(quantityInput).toHaveValue('3');
    });

    await delay(700);

    await step('스텝퍼 버튼 인풋 박스에 숫자를 입력하면 상품 수량이 증가한다.', async () => {
      await userEvent.type(quantityInput, '4', { delay: 200 });

      expect(quantityInput).toHaveValue('34');
    });

    await delay(700);

    await step('스텝퍼 버튼의 "-" 아이콘을 클릭하면 장바구니 상품 수량이 감소한다.', async () => {
      await userEvent.click(decreaseButton);

      expect(quantityInput).toHaveValue('33');
    });
  },
};
