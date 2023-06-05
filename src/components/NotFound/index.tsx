import { Link } from 'react-router-dom';
import styled from 'styled-components';
import patrick from '../../assets/patrick.jpg';
import { PATH } from '../../constants';

const NotFound = () => {
  return (
    <Style.NotFoundWrapper>
      <Style.ImgWrapper />
      <Style.NoExistItemsMessage>
        <p>잘못된 페이지를 요청했거나 에러가 발생했습니다 🥲</p>
        <Link to={PATH.HOME}>돌아가기🚀</Link>
      </Style.NoExistItemsMessage>
    </Style.NotFoundWrapper>
  );
};

const Style = {
  NotFoundWrapper: styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ImgWrapper: styled.img.attrs({
    src: patrick,
    alt: '404페이지', // 대체 텍스트
  })`
    width: 245px;
    height: 430px;

    margin: 10px 0;
  `,

  NoExistItemsMessage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 200px;

    color: var(--grey-300);

    & > p {
      font-size: 20px;
      margin-bottom: 30px;

      line-height: 25px;
    }

    & > a {
      color: var(--grey-400);
      border-bottom: 3px solid var(--grey-400);
    }
  `,
};

export default NotFound;
