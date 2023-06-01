import styled from 'styled-components';

import { CouponType } from '@Types/index';

import { DownloadIcon } from '@Asset/icon';

interface CouponDownload {
  coupon: CouponType;
  isDownLoaded?: boolean;
  handleClick: () => void;
}

const CouponDownload = ({ coupon, isDownLoaded = true, handleClick }: CouponDownload) => {
  return (
    <Container>
      <Title>쿠폰 다운받기</Title>
      <Subtitle>지금 다운받으세요!</Subtitle>
      <CouponContainer>
        <Detail>
          {isDownLoaded ? (
            '이미 다운로드 된 쿠폰입니다.'
          ) : (
            <>
              클릭 시 바로 <Bold>다운로드!</Bold>
            </>
          )}
        </Detail>
        <LeftContents>
          <Name>{coupon.name}</Name>
          <DiscountAmount>
            {coupon.discountAmount.toLocaleString()}
            <WonText>원</WonText>
          </DiscountAmount>
          <Description>{coupon.description}</Description>
        </LeftContents>
        <RightContents>
          <DownLoadButton onClick={handleClick}>{isDownLoaded ? '✔' : <DownloadIcon />}</DownLoadButton>
        </RightContents>
      </CouponContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 390px;
  padding: 50px 0 80px 0;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

const Subtitle = styled.div`
  font-size: 24px;
  color: rgb(6, 192, 158);
  margin-bottom: 20px;
`;

export const Detail = styled.div`
  position: absolute;
  bottom: -25px;
  right: 50px;

  width: 240px;
  padding: 15px 10px;

  color: white;
  text-align: center;
  font-size: 17px;

  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: rgb(71, 201, 180);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
`;

export const Bold = styled.span`
  color: white;
  font-weight: 700;
  font-size: 19px;
`;

const CouponContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 500px;
  height: 185px;
  padding: 40px 50px;

  border-radius: 20px;
  background-color: #fdfdfd;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const LeftContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`;

const RightContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  height: 100%;
  width: 100px;
  border-left: 1px solid #dddddd;
`;

const Name = styled.div`
  margin-left: 5px;
  font-size: 28px;
  font-weight: 700;
`;

const DiscountAmount = styled.div`
  font-size: 80px;
  letter-spacing: 1px;
  font-weight: 700;
`;

const WonText = styled.span`
  margin-left: 4px;
  font-size: 50px;
  font-weight: 700;
`;

const Description = styled.div`
  font-size: 24px;
  margin-left: 12px;
`;

const DownLoadButton = styled.button`
  width: 60px;
  height: 100px;
  border-bottom: 5px solid black;

  font-size: 70px;
  font-weight: 900;
  background-color: transparent;
  margin-bottom: 40px;

  cursor: pointer;
`;

export default CouponDownload;
