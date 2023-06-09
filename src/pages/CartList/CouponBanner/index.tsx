import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Modal from '@Components/Modal';
import Slider from '@Components/Slider';

import { CouponType, MemberCouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import memberCouponState from '@Atoms/memberCouponState';
import serverState from '@Atoms/serverState';
import totalCouponState from '@Atoms/totalCouponState';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import { ALERT_MESSAGE } from '@Constants/index';
import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import * as S from './style';
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
      alert(ALERT_MESSAGE.DOWNLOADED_COUPON);
      return;
    }

    fetchData({ url: `${FETCH_URL.totalCoupon}/${id}`, method: FETCH_METHOD.POST, server });
    updateMemberCoupon();
  };

  if (cartAmount === 0) return null;

  return (
    <>
      <Slider>
        {totalCoupon.map((coupon) => (
          <S.Item onClick={makeOpenModal(coupon)} key={coupon.id}>
            {coupon.name} 받기
          </S.Item>
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
