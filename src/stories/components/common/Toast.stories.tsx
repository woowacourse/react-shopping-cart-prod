import { Meta } from '@storybook/react';
import { css, styled } from 'styled-components';
import ToastComponent from '../../../components/common/Toast';

const meta = {
  component: ToastComponent,
  title: 'Components/Toast',
  tags: ['autodocs'],
  args: {
    duration: 6000,
    message: '장바구니에 상품이 담겼습니다',
  },
  argTypes: {
    duration: {
      description: '지속 시간을 변경할 수 있습니다.',
    },
    message: {
      description: '토스트 메시지를 변경할 수 있습니다.',
    },
    css: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ToastComponent>;

export default meta;

export const Toast = (args: any) => {
  return (
    <S.Wrapper>
      <ToastComponent css={toastStyle} {...args} />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: relative;
    height: 80vh;
  `,
};

const toastStyle = css`
  position: absolute;
  display: block;
`;
