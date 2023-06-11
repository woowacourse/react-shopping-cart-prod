import { styled } from 'styled-components';

interface Props {
  value: string;
}

const Title = ({ value }: Props) => {
  return <S.Subtitle>{value}</S.Subtitle>;
};

const S = {
  Subtitle: styled.h2`
    width: 100%;
    margin-bottom: 28px;
    padding-bottom: 30px;
    border-bottom: 4px solid var(--text-color);
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    color: var(--text-color);
  `,
};

export default Title;
