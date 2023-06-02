import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Modal from '@Components/Modal';
import Slider from '@Components/Slider';

import { CouponType, MemberCouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import memberCouponState from '@Atoms/memberCouponState';
import serverState from '@Atoms/serverState';
import totalCouponState from '@Atoms/totalCouponState';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import CouponDownload from '../CouponDownLoad';

const CouponBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectCoupon, setSelectCoupon] = useState<CouponType>({
    id: null,
    name: '',
    discountAmount: 0,
    description: '',
  });

  const [memberCoupon, setMemberCoupon] = useRecoilState(memberCouponState);
  const totalCoupon = useRecoilValue(totalCouponState);
  const server = useRecoilValue(serverState);
  const cartAmount = useRecoilValue(cartItemsAmountState);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const makeOpenModal = (coupon: CouponType) => () => {
    setSelectCoupon(coupon);
    setIsModalOpen(true);
  };

  const updateMemberCoupon = async () => {
    const data = await fetchData<MemberCouponType[]>({ url: FETCH_URL.memberCoupon, method: FETCH_METHOD.GET, server });
    setMemberCoupon(data);
  };

  const isDownLoadedId = (name: string): boolean => {
    return memberCoupon.filter((coupon) => !coupon.isUsed).some((coupon) => coupon.name === name);
  };

  const makePrintCoupon = (id: number, isDownLoaded: boolean) => () => {
    if (isDownLoaded) {
      alert('이미 다운로드 된 쿠폰입니다.');
      return;
    }

    fetchData({ url: `${FETCH_URL.totalCoupon}/${id}`, method: FETCH_METHOD.POST, server });
    updateMemberCoupon();
  };

  if (cartAmount === '0') return <></>;

  return (
    <>
      <Slider>
        {totalCoupon.map((coupon) => (
          <Item onClick={makeOpenModal(coupon)} key={coupon.id}>
            {coupon.name} 받기
          </Item>
        ))}
      </Slider>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CouponDownload
            coupon={selectCoupon}
            handleClick={makePrintCoupon(selectCoupon.id!, isDownLoadedId(selectCoupon.name))}
            isDownLoaded={isDownLoadedId(selectCoupon.name)}
          />
        </Modal>
      )}
    </>
  );
};

export default CouponBanner;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0px 60px;

  font-size: 24px;
  font-weight: 700;
  background-color: rgb(51, 51, 51);
  color: white;

  cursor: pointer;
`;
