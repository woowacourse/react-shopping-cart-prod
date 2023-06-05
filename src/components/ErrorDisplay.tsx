import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface Props {
  error: Error;
}

const imageUrl =
  'https://img.freepik.com/free-photo/high-angle-dog-making-a-mess-with-toilet-paper_23-2149544912.jpg?w=2000&t=st=1683042025~exp=1683042625~hmac=d692d7303bf32037bf61ca2f6c8e0a8930b299e8e2c3f447ec45d5c3740267b3';

export default function ErrorDisplay({ error }: Props) {
  const navigate = useNavigate();

  return (
    <Style.Container role="alert">
      <Style.HomeButton title="홈으로 가기" onClick={() => navigate('/')}>
        <Style.Image src={imageUrl} alt="휴지와 해맑은 강아지"></Style.Image>
        Go Home
      </Style.HomeButton>
      <Style.ImageSource>
        이미지 출처:
        <a href="https://kr.freepik.com/free-photo/high-angle-dog-making-a-mess-with-toilet-paper_29652590.htm#query=No%20data%20dog&position=8&from_view=search&track=ais">
          Freepik
        </a>
      </Style.ImageSource>
      <Style.Title>문제가 생겼어요.</Style.Title>
      <Style.ErrorCaption>{error.message}</Style.ErrorCaption>
      <Style.Content>
        {'같은 문제가 반복된다면 웹 페이지를 껐다 켠 후 처음부터 다시 한번 시도해주세요.'}
      </Style.Content>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 932px;

    position: relative;
    padding: 30px;
    border-radius: 8px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      max-width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      max-width: 315px;
    }
  `,

  HomeButton: styled.button`
    &:hover {
      transition: transform 0.3s ease;
      transform: scale(1.01);
    }
  `,

  Image: styled.img`
    display: block;

    width: 200px;
    border-radius: 10px;

    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  `,

  ImageSource: styled.p`
    margin-top: 10px;

    font-size: 8px;
    color: #c4c4c4;

    & a {
      color: inherit;
      text-decoration: none;
    }
  `,

  Title: styled.span`
    margin-top: 20px;
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: bold;
    text-align: justify;
  `,

  Content: styled.p`
    margin-top: 15px;

    font-size: 16px;
    text-align: justify;
    color: #575757;
    white-space: pre-line;
  `,

  ErrorCaption: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 80px;
    border-radius: 7px;
    background-color: #fff2f2;
    padding: 10px;

    color: #ff0000;
  `,
};
