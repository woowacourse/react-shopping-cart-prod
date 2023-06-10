import { styled } from 'styled-components';
import { Coupon } from '../../../types/product';
import { AiOutlineDownload } from 'react-icons/ai';
import { COUPON_TYPE_UNIT } from '../../../constant/common';
import useRequestGetCoupon from '../../../hooks/useCouponService';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

const CouponItem = (coupon: Coupon) => {
  const { id, amount, type, name } = coupon;
  const { requestGetCoupon, isLoading } = useRequestGetCoupon(id);

  const amountWithType = `${amount}${COUPON_TYPE_UNIT[type]}`;

  const handleGetCoupon = async () => {
    if (isLoading) return;

    const isSuccess = await requestGetCoupon();

    if (!isSuccess) {
      alert('이미 발급받은 쿠폰입니다.');
      return;
    }

    alert('쿠폰 발급에 성공했습니다.');
  };

  return (
    <CouponItemContainer>
      <CouponContents>
        <DiscountAmount>{amountWithType}</DiscountAmount>
        <CouponName>{name}</CouponName>
        <CouponDescription>
          상품 금액의 {amountWithType} 만큼 할인 적용
        </CouponDescription>
      </CouponContents>
      <GetCouponButton onClick={handleGetCoupon}>
        {isLoading ? (
          <LoadingSpinner diameter="30px" spinnerWidth="3px" color="white" />
        ) : (
          <>
            <AiOutlineDownload />
            <DownloadText>쿠폰 받기</DownloadText>
          </>
        )}
      </GetCouponButton>
    </CouponItemContainer>
  );
};

const CouponItemContainer = styled.div`
  display: flex;

  width: 100%;
  height: 115px;

  border: 1px solid rgb(218, 221, 224);
  border-radius: 8px;
`;

const CouponContents = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 16px;

  background-color: white;
  border-radius: 8px 0 0 8px;
`;

const DiscountAmount = styled.h3`
  font-size: 22px;
  line-height: 24px;
  color: rgb(47, 52, 56);
  font-weight: 700;
`;

const CouponName = styled.p`
  font-size: 16px;
  line-height: 18px;
  color: rgb(47, 52, 56);

  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`;

const CouponDescription = styled.p`
  font-size: 14px;
  line-height: 16px;
  color: rgb(130, 140, 148);

  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`;

const GetCouponButton = styled.button`
  width: 100px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  border: none;
  border-radius: 0 8px 8px 0;
  background-color: rgb(247, 249, 250);

  font-size: 20px;
  color: rgb(130, 140, 148);

  overflow: hidden;
  cursor: pointer;
`;

const DownloadText = styled.p`
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
`;

export default CouponItem;
