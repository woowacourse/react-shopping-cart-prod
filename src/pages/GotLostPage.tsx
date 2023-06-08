import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ROUTE_PATH } from '../constants';

const GotLost = () => {
  return (
    <S.Section>
      <h2>🐾 길을 잃으셨나요?</h2>
      <S.Link to={ROUTE_PATH.MAIN_PAGE}>
        여기를 클릭하시면
        <span>메인 페이지로 이동합니다.</span>
      </S.Link>
    </S.Section>
  );
};

const S = {
  Section: styled.section`
    text-align: center;

    & h2 {
      font-size: 24px;
      font-weight: 700;
      margin: 180px 0 46px;
    }
  `,

  Link: styled(Link)`
    display: inherit;
    width: 20%;
    min-width: 280px;
    padding: 14px 50px;
    margin: 0 auto;
    line-height: 1.6;
    color: var(--white-color);
    border-radius: 20px;
    word-break: keep-all;
    text-decoration: none;
    background: #c9b7e5;

    &:hover {
      background: #9b7ec8;
    }

    & > span {
      display: block;
    }
  `,
};

export default GotLost;
