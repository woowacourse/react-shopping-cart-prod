import { Meta } from '@storybook/react';
import { BsPlus, BsDash } from 'react-icons/bs';
import { css } from 'styled-components';
import ButtonComponent from '../../../components/common/Button';
import CartIcon from '../../../components/icons/CartIcon';
import TrashCanIcon from '../../../components/icons/TrashCanIcon';

const meta = {
  component: ButtonComponent,
  title: 'Components/Button',
  tags: ['autodocs'],
  args: {
    children: '버튼',
    onClick: () => {},
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: '버튼명을 변경할 수 있습니다.',
    },
    css: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ButtonComponent>;

export default meta;

export const Button = (args: any) => {
  return <ButtonComponent>{args.children}</ButtonComponent>;
};

export const LogoButton = () => {
  return (
    <ButtonComponent css={logoButtonStyle}>
      <CartIcon aria-label='하얀색 카트 모양의 로고' />
      <span>STORE</span>
    </ButtonComponent>
  );
};

export const CartButton = () => {
  return <ButtonComponent css={cartButtonStyle}>장바구니</ButtonComponent>;
};

export const CartIconButton = () => {
  return (
    <ButtonComponent
      css={css`
        align-self: start;
      `}
    >
      <CartIcon
        css={css`
          transform: scaleX(-1);
        `}
      />
    </ButtonComponent>
  );
};

export const OrderButton = () => {
  return <ButtonComponent css={orderButtonStyle}>주문하기</ButtonComponent>;
};

export const QuantityButton = () => {
  return (
    <>
      <ButtonComponent css={quantityButtonStyle}>
        <BsPlus aria-label='상품 수량 1개 더하기' />
      </ButtonComponent>
      <ButtonComponent css={quantityButtonStyle}>
        <BsDash aria-label='상품 수량 1개 줄이기' />
      </ButtonComponent>
    </>
  );
};

export const TrashCanButton = () => {
  return (
    <ButtonComponent>
      <TrashCanIcon patternId={1} imageSize={{ width: '40', height: '40' }} />
    </ButtonComponent>
  );
};

export const DeleteButton = () => {
  return <ButtonComponent css={deleteButtonStyle}>선택삭제</ButtonComponent>;
};

const logoButtonStyle = css`
  display: flex;
  align-items: center;
  padding: 4px;
  color: #fff;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.2px;
  background: var(--text-color);

  & svg {
    width: 44px;
    height: 36px;
    margin-right: 20px;
    fill: #fff;
  }

  @media (max-width: 768px) {
    font-size: 28px;

    & svg {
      width: 40px;
      margin-right: 16px;
    }
  }

  @media (max-width: 480px) {
    font-size: 24px;

    & svg {
      align-self: center;
      width: 34px;
      margin-right: 8px;
      padding: 2px;
    }
  }
`;

const cartButtonStyle = css`
  padding: 4px;
  margin-right: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  background: var(--text-color);
`;

const quantityButtonStyle = css`
  width: 26px;
  max-width: 26px;
  border: 1px solid var(--gray-color-200);
  font-size: 16px;
`;

const orderButtonStyle = css`
  width: calc(100% - 60px);
  padding: 26px 120px;
  margin: 0 30px;
  background: var(--text-color);
  font-size: 22px;
  color: #fff;

  @media (max-width: 548px) {
    padding: 20px 10px;
    font-size: 16px;
  }
`;

const deleteButtonStyle = css`
  margin-left: 20px;
  padding: 6px 12px 7px;
  border: 1px solid var(--gray-color-100);

  @media (max-width: 548px) {
    margin-left: 12px;
  }
`;
