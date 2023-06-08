import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';

interface Props {
  src: string;
  alt: string;
  description?: string;
}

const Nothing = ({ src, alt, description }: Props) => {
  return (
    <>
      <S.Nothing src={src} alt={alt} tabIndex={0} />
      <S.Description>{description}</S.Description>
      <S.Link to={ROUTE_PATH.MAIN_PAGE}>주문하러 가기</S.Link>
    </>
  );
};

const S = {
  Nothing: styled.img`
    display: block;
    width: 50%;
    height: 220px;
    min-width: 230px;
    max-width: 360px;
    min-height: 328px;
    margin: 0 auto;
  `,

  Description: styled.p`
    text-align: center;
    margin: 20px 20px 40px;
    line-height: 1.6;
    word-break: keep-all;
  `,

  Link: styled(Link)`
    display: block;
    width: 20%;
    min-width: 200px;
    margin: 0 auto;
    padding: 20px 0;
    color: var(--white-color);
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    background: var(--highlight-color);

    &:hover {
      transform: scale(1.01);
    }
  `,
};

export default Nothing;
