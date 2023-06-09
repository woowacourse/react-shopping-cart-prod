import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import LinkButton from '../components/common/LinkButton/LinkButton';

const OrderCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state ?? {};

  useEffect(() => {
    if (Number.isNaN(Number(orderId))) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <Section>
      <p>주문이 완료되었습니다!!</p>
      <p>주문번호: {orderId}</p>
      <LinkButton to="/orders">주문 목록으로 가기</LinkButton>
      <LinkButton to="/" replace>
        초기 화면으로 가기
      </LinkButton>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 280px 0;
  margin: 0 auto;

  width: 100%;
  height: 100%;

  font-weight: 500;
  font-size: 30px;
`;

export default OrderCompletePage;
