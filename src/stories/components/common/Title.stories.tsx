import { Meta } from '@storybook/react';
import TitleComponent from '../../../components/common/Title';

const meta = {
  component: TitleComponent,
  title: 'Components/Title',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 'calc(100vw - 32vw)' }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    title: '타이틀',
  },
  argTypes: {
    title: {
      description: '타이틀을 변경할 수  있습니다.',
    },
  },
} satisfies Meta<typeof TitleComponent>;

export default meta;

interface CartProps {
  title: string;
}

export const Title = (args: CartProps) => <TitleComponent title={args.title} />;

export const CartTitle = () => <TitleComponent title='장바구니' />;

export const OrderListTitle = () => <TitleComponent title='주문 목록' />;

export const OrderDetailTitle = () => <TitleComponent title='주문 내역 상세' />;
