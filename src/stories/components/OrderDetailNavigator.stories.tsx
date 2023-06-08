import { Meta } from '@storybook/react';
import { styled } from 'styled-components';
import OrderDetailNavigatorComponent from '../../components/orderList/OrderDetailNavigator';
import { ORDER_STATUS } from '../../constants';

const meta = {
  component: OrderDetailNavigatorComponent,
  title: 'Components/OrderList/OrderDetailNavigator',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <S.Wrapper>
        <Story />
      </S.Wrapper>
    ),
  ],
} satisfies Meta<typeof OrderDetailNavigatorComponent>;

export default meta;

export const OrderDetailNavigator = () => (
  <OrderDetailNavigatorComponent
    orderId={1}
    createdAt='2023-06-04'
    orderStatus={ORDER_STATUS.PAID}
  />
);

const S = {
  Wrapper: styled.div`
    width: calc(100vw - 38vw);
  `,
};
