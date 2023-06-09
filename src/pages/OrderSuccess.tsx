import { Suspense } from 'react';
import { Layout } from '../layout';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import { useNavigate } from 'react-router-dom';

export const OrderSuccess = () => {
  const moveToOrderPage = useNavigate();

  const handleButton = () => {
    moveToOrderPage('/orders');
  };

  return (
    <Layout>
      <Style.Content>
        <Suspense fallback={<Loading />}>
          <Style.SucessImageContainer>
            <Style.SuccessImage
              src={`${process.env.PUBLIC_URL}/assets/success.png`}
            />
            <p>주문이 완료되었습니다!</p>
            <button onClick={handleButton}>주문 목록 확인하기</button>
          </Style.SucessImageContainer>
        </Suspense>
      </Style.Content>
    </Layout>
  );
};

const Style = {
  Content: styled.div`
    max-width: 1080px;
    height: max-content;

    display: flex;
    justify-content: center;

    margin: 0 auto;
  `,

  SucessImageContainer: styled.div`
    max-width: 1080px;
    min-height: 80vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
      font-size: 32px;
      margin-top: 60px;

      @media (max-width: 480px) {
        font-size: 28px;
      }
    }

    & > button {
      width: 180px;
      height: 60px;

      font-size: 18px;
      background-color: #33ba7c;
      color: #ffffff;
      border-radius: 10px;

      margin-top: 80px;
    }
  `,

  SuccessImage: styled.img`
    width: 300px;
    height: 300px;

    @media (max-width: 480px) {
      width: 130px;
      height: 130px;
    }
  `,
};
