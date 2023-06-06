import { styled } from 'styled-components';

interface Props {
  price: number;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  color: string;
  tag?: string;
  label?: string;
  isDiscount?: boolean;
}

export default function Price({
  price = 0,
  size = 'medium',
  color = 'inherit',
  tag,
  label = '',
  isDiscount = false,
}: Partial<Props>) {
  return (
    <Style.Wrapper className={size} color={color} aria-label={`${label} 가격 ${price}원`}>
      {tag && <span>{tag}</span>}
      {isDiscount ? '-' : ''}
      {price.toLocaleString('ko-KR')}원
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.p<Partial<Props>>`
    display: flex;
    justify-content: space-between;

    &.small {
      font-size: 10px;
    }

    &.medium {
      font-size: 16px;
    }

    &.large {
      font-size: 20px;
    }

    &.extra-large {
      font-size: 30px;
    }

    color: ${({ color }) => color};
  `,
};
