import { useLayoutEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getCouponsApi, postCouponApi } from "../api";
import { Button, CouponSelectBox, Header, Page } from "../components";
import { useRouter } from "../hooks/useRouter";
import { useToast } from "../hooks/useToast";
import { memberState } from "../recoil/atom";
import { ROUTER_PATH } from "../router";
import { MyCouponType } from "../types/domain";

const MyPage = () => {
  const { goPage } = useRouter();
  const { showToast } = useToast();
  const member = useRecoilValue(memberState);
  const [coupons, setCoupons] = useState<MyCouponType[]>([]);
  const [selectedCouponIndex, setSelectedCouponIndex] = useState<number>(-1);

  useLayoutEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCouponsApi();
        if (!response.ok) throw new Error(response.status.toString());
        const data = await response.json();
        setCoupons(data.coupons);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCouponSelected = (index: number) => {
    setSelectedCouponIndex(index);
  };

  const handleButtonClicked = async () => {
    try {
      const response = await postCouponApi(coupons[selectedCouponIndex].id);
      if (!response.ok) throw new Error(response.status.toString());

      showToast("success", "쿠폰이 발급되었습니다!");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Page>
        <ProfileBox>
          <p>🖐🏻 {member.nickname}</p> 님, 즐거운 쇼핑 되세요!
        </ProfileBox>
        <OptionsContainer>
          <OptionBox onClick={goPage(ROUTER_PATH.OrderHistory)}>
            주문 내역 보러가기
          </OptionBox>
          <CouponOptionContainer>
            <CouponSelectBox
              type="get"
              coupons={coupons}
              onSelectHandler={handleCouponSelected}
            />
            {selectedCouponIndex !== -1 && (
              <Button onClick={handleButtonClicked}>발급 받기</Button>
            )}
          </CouponOptionContainer>
        </OptionsContainer>
      </Page>
    </>
  );
};

const ProfileBox = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 30px 0 0 30px;
  color: var(--dark-gray);
  font-size: 15px;
  font-weight: 500;

  & > p {
    font-size: 25px;
    font-weight: 700;
    margin-right: 3px;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 10px;
  height: 100vh;
  max-width: 380px;
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #dddddd;
  border-bottom: 3px solid #dddddd;
  padding: 0 20px;
  width: 100%;
  height: 55px;
  color: var(--dark-gray);
  font-size: 17px;
  cursor: pointer;

  &:hover {
    opacity: 50%;
  }
`;

const CouponOptionContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: auto;
  gap: 20px;
`;

export default MyPage;
