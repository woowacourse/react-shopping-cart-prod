import { Text } from '../common/Text/Text';
import CouponList from '../list/CouponList/CouponList';
import PageTemplate from '../templates/PageTemplate';
import styled from '@emotion/styled';

const EventPage = () => {
  return (
    <PageTemplate
      title="장바구니 미션 - 이벤트 쿠폰 발급 페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 이벤트 쿠폰 발급 페이지입니다."
    >
      <EventPageWrapper>
        <EventPageHead>
          <Text size="extraLarge" weight="bold">
            ✨EVENT ZONE✨
          </Text>
        </EventPageHead>
        <CouponList />
      </EventPageWrapper>
    </PageTemplate>
  );
};

export default EventPage;

const EventPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1140px;
  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 350px;
  }
`;

const CouponListWrapper = styled.div`
  width: 100%;
  margin-top: -50px;
`;

const EventPageHead = styled.div`
  border-bottom: 4px solid #333;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;
