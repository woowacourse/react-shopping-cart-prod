import { styled } from 'styled-components';

interface Props {
  title: string;
}

const Title = ({ title }: Props) => {
  return <S.Head>{title}</S.Head>;
};

const S = {
  Head: styled.h2`
    width: 100%;
    padding-bottom: 30px;
    border-bottom: 4px solid var(--text-color);
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    color: var(--text-color);
  `,
};

export default Title;
