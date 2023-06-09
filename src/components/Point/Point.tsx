import {useEffect} from "react";
import {useRecoilValue} from "recoil";
import {pointState} from "../../app/recoil/order/orderAtom.ts";
import {useNavigate} from "react-router-dom";
import {
  CurrentPoint,
  FatBorder,
  GoToOrderDetail,
  PointHeader,
  PointHistoryText,
  PointHistoryWrapper,
  ThinBorder,
} from "./Point.style.ts";
import {modalRepository} from "../../app/recoil/modal/modalRepository.tsx";
import {orderRepository} from "../../app/recoil/order/orderRepository.ts";

function Point() {
  const {closeModal} = useRecoilValue(modalRepository);
  const {loadPoint} = useRecoilValue(orderRepository);
  const point = useRecoilValue(pointState);
  const navigate = useNavigate();

  useEffect(() => {
    loadPoint();
  }, []);

  const handleOrder = (orderId: number) => {
    navigate(`/order/${orderId}`);
    closeModal();
  };

  return (
    <>
      <PointHeader>포인트</PointHeader>
      <FatBorder/>
      <CurrentPoint>잔여 포인트: {point.totalPoint}점</CurrentPoint>
      <ThinBorder/>
      <div>
        {point.pointHistories.map((history) => (
          <PointHistoryWrapper key={history.orderId}>
            <GoToOrderDetail onClick={() => handleOrder(history.orderId)}>
              주문확인 바로가기
            </GoToOrderDetail>
            <PointHistoryText>+ {history.earnedPoint}점(획득)</PointHistoryText>
            <PointHistoryText>- {history.usedPoint}점(사용)</PointHistoryText>
          </PointHistoryWrapper>
        ))}
      </div>
    </>
  );
}

export default Point;
