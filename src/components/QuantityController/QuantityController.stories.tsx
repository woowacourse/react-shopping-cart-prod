import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import QuantityController from '.';

/**
 * `QuantityControlButton`은 물품의 수량을 보여주고 증감을 조절하는 역할을 하는 기본적인 컴포넌트입니다.
 */
const meta: Meta<typeof QuantityController> = {
  title: 'QuantityController',
  component: QuantityController,
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <BrowserRouter>{storyFn()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof QuantityController>;

/**
 * 장바구량에 담긴 물품의 수량이 1인 경우의 스토리입니다.
 */
export const DefaultQuantityController: Story = {
  args: {
    quantity: 1,
  },
};

/**
 * 장바구량에 담긴 물품의 수량이 0인 경우의 스토리입니다.
 */
export const ZeroQuantityController: Story = {
  args: {
    quantity: 0,
  },
};

/**
 * 장바구량에 담긴 물품의 수량이 99인 경우의 스토리입니다.
 */
export const MaxQuantityController: Story = {
  args: {
    quantity: 99,
  },
};
