import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useModal } from '../../../hooks/useModal';
import CheckBox from '../CheckBox/CheckBox';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import useCoupon from '../../../hooks/useCoupon';
import CouponItem from '../../box/Cart/CouponItem/CouponItem';
import { useCartFetch } from '../../../hooks/useCartFetch';
import { CouponType } from '../../../types/types';
import { appliedCouponState, couponListModalState } from '../../../service/atom';
import { useRecoilState } from 'recoil';

// const couponData = [
//   {
//     issuable: true,
//     id: 0,
//     name: '썸머특집 20% 할인쿠폰',
//     discountType: 'rate',
//     discountRate: 0.2,
//     discountAmount: 0,
//     minimumPrice: 30000,
//   },
//   {
//     issuable: true,
//     id: 1,
//     name: '오픈기념 5,000원 할인쿠폰',
//     discountType: 'money',
//     discountRate: 0,
//     discountAmount: 5000,
//     minimumPrice: 10000,
//   },
// ];

const CouponListModal = () => {
  const { closeModal } = useModal(couponListModalState);

  const [appliedCoupon, setAppliedCoupon] = useRecoilState(appliedCouponState);

  const { calcTotalPrice } = useCartFetch();
  const { couponData } = useCoupon('my');

  const [clickedCoupon, setClickedCoupon] = useState<number | null>(appliedCoupon?.id ?? null);
  const [couponList, setCouponList] = useState<(CouponType & { isUsable: boolean })[]>([]);

  useEffect(() => {
    if (couponData) {
      const check = couponData.filter((coupon) => coupon.minimumPrice <= calcTotalPrice);

      const newCouponList: (CouponType & { isUsable: boolean })[] = couponData.map((coupon) =>
        coupon.minimumPrice <= calcTotalPrice
          ? { ...coupon, isUsable: true }
          : { ...coupon, isUsable: false },
      );

      if (check.length > 0) {
        setCouponList(newCouponList);
        return;
      }
      setCouponList(newCouponList);
    }
  }, [couponData, calcTotalPrice]);

  const onApply = () => {
    setAppliedCoupon(couponList.find((coupon) => coupon.id === clickedCoupon) ?? null);
    closeModal();
  };

  const [showAvailable, setShowAvailable] = useState(false);

  return (
    <ModalWrapper>
      <ModalHeader>
        <Text size="smaller" weight="normal">
          할인쿠폰 적용 및 조회
        </Text>
        <CloseButton
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHBhdGggZD0iTTIwIDRMNCAyMCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4gPHBhdGggZD0iTTQgNEwyMCAyMCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4gPC9zdmc+IA=="
          alt="close-button"
          onClick={closeModal}
        />
      </ModalHeader>
      <ModalInner>
        <ModalInnerHead>
          <ShowAvailableCouponButton onClick={() => setShowAvailable((prev) => !prev)}>
            <CheckBox checked={showAvailable} />
            <Text size="smaller" weight="light">
              적용가능 쿠폰만 보기
            </Text>
          </ShowAvailableCouponButton>
        </ModalInnerHead>
        <ModalScroll>
          <ModalScrollInner>
            <CouponListHead>
              <Text size="smaller" weight="bold">
                할인쿠폰
              </Text>
            </CouponListHead>
            <CouponList>
              <CouponItem
                key={'nothing'}
                isClicked={clickedCoupon === null}
                onClick={() => setClickedCoupon(null)}
                usable
              />
              {couponList
                ?.filter((coupon) => (showAvailable ? coupon.isUsable : coupon))
                .sort((a, b) => Number(b.isUsable) - Number(a.isUsable))
                .map((coupon) => (
                  <CouponItem
                    key={coupon.id}
                    coupon={coupon}
                    isClicked={coupon.id === clickedCoupon}
                    onClick={() => setClickedCoupon(coupon.id)}
                    usable={coupon.isUsable}
                  />
                ))}
            </CouponList>
          </ModalScrollInner>
        </ModalScroll>
        <ModalInnerFooter>
          <Button
            text="할인쿠폰 적용하기"
            size="big"
            width="100%"
            height={40}
            borderRadius={2}
            fontSize={16}
            primary
            onClick={onApply}
          />
        </ModalInnerFooter>
      </ModalInner>
    </ModalWrapper>
  );
};

export default CouponListModal;

const CloseButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 20px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 56px;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalInnerHead = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
`;

const ShowAvailableCouponButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModalScroll = styled.div`
  overflow-y: scroll;
  height: 480px;
`;

const ModalScrollInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const CouponListHead = styled.div`
  border-width: 8px 0 1px 0;
  border-color: rgba(0, 0, 0, 0.05);
  border-style: solid;
  padding: 14px 16px;
`;

const ModalInnerFooter = styled.div`
  padding: 16px;
`;

const CouponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;
