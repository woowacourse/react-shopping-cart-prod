import Image from '@/components/common/Image/Image';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import useResponsive from '@/hooks/useResponsive';
import * as Styled from './OrderDetail.style';

function OrderDetail() {
  const responsive = useResponsive();

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>주문내역상세</Styled.Title>
        <Styled.OrderNumber>주문번호: 1</Styled.OrderNumber>
        <Styled.OrderDetailsContainer>
          <Styled.OrderItemContainer>
            <Image
              src="./assets/images/emptyImage.png"
              alt="대체 이미지"
              width={responsive === 'desktop' ? '400px' : '250px'}
            />
            <Styled.OrderDescriptionContainer>
              <h2>상품명</h2>
              <p>000원/수량: 0개</p>
            </Styled.OrderDescriptionContainer>
          </Styled.OrderItemContainer>
          <Styled.OrderItemContainer>
            <Image
              src="./assets/images/emptyImage.png"
              alt="대체 이미지"
              width={responsive === 'desktop' ? '400px' : '250px'}
            />
            <Styled.OrderDescriptionContainer>
              <h2>상품명</h2>
              <p>000원/수량: 0개</p>
            </Styled.OrderDescriptionContainer>
          </Styled.OrderItemContainer>
        </Styled.OrderDetailsContainer>
      </Styled.Container>
    </PageTemplate>
  );
}

export default OrderDetail;
