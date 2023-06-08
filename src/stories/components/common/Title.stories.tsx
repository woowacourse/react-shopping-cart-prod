import { Meta } from '@storybook/react';
import { styled } from 'styled-components';
import TitleComponent from '../../../components/common/Title';

const meta = {
  component: TitleComponent,
  title: 'Components/Title',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <S.Wrapper>
        <Story />
      </S.Wrapper>
    ),
  ],
  args: {
    value: '타이틀',
  },
  argTypes: {
    value: {
      description: '타이틀을 변경할 수  있습니다.',
    },
  },
} satisfies Meta<typeof TitleComponent>;

export default meta;

interface Props {
  value: string;
}

export const Title = (args: Props) => <TitleComponent value={args.value} />;

export const CartTitle = () => <TitleComponent value='장바구니' />;

export const OrderListTitle = () => <TitleComponent value='주문 목록' />;

export const OrderDetailTitle = () => <TitleComponent value='주문 내역 상세' />;

const S = {
  Wrapper: styled.div`
    width: calc(100vw - 38vw);
  `,
};
