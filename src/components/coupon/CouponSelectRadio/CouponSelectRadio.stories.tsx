import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CouponSelectRadio from './CouponSelectRadio';
import type { CouponInfo } from '../../../types/coupon';
import storybookHandlers from '../../../mocks/storybookHandlers';

const meta: Meta<typeof CouponSelectRadio> = {
  title: 'CouponSelectRadio',
  component: CouponSelectRadio,
  tags: ['autodocs'],
  parameters: { msw: storybookHandlers },
};

export default meta;

type Story = StoryObj<typeof meta>;

const StateProvider = () => {
  const [selected, setSelected] = useState<CouponInfo | null>(null);

  return <CouponSelectRadio selected={selected} setSelected={setSelected} />;
};

export const Default: Story = {
  render: () => <StateProvider />,
};
