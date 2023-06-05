import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import patrick from '../../assets/patrick.jpg';
import { Button } from '../common/Button';

const NotFound = () => {
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate('/');
  };
  return (
    <Style.NotFoundWrapper>
      <span>아뇨 뚱인데요?~ 페이지를 찾을 수 없다구요!</span>
      <Style.ImgWrapper />
      <Button onClick={goToMainPage} designType="rectangle">
        홈으로~~
      </Button>
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

    margin-bottom: 30px;
  `,
};

export default NotFound;
