import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {
  PointButton,
  PointDescription,
  PointInput,
  PointInputTitle,
  PointInputWrapper,
  PointSelectorHeader,
  PointSelectorInput,
  PointSelectorWrapper,
  PointText,
} from "./PointSelector.style";
import {ChangeEvent, useEffect} from "react";
import {
  pointState,
  selectedPointState,
} from "../../app/recoil/order/orderAtom.ts";
import {totalPriceSelector} from "../../app/recoil/cart/cartSelectors.ts";
import {orderRepository} from "../../app/recoil/order/orderRepository.ts";

function PointSelector() {
  const point = useRecoilValue(pointState);
  const [selectedPoints, setSelectedPoints] =
    useRecoilState(selectedPointState);
  const resetSelectedPoints = useResetRecoilState(selectedPointState);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const {loadPoint} = useRecoilValue(orderRepository);

  useEffect(() => {
    resetSelectedPoints();
    loadPoint();
  }, []);

  const pointLimiter = (newPoint: number, totalPrice: number) => newPoint > totalPrice ? totalPrice : newPoint;

  const handlePointInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputNumber = parseInt(inputValue.length > 0 ? inputValue : "0");
    const newPoint =
      inputNumber > point.totalPoint ? point.totalPoint : inputNumber;
    setSelectedPoints(pointLimiter(newPoint, totalPrice));
  };

  const handlePointButton = () => {
    setSelectedPoints(pointLimiter(point.totalPoint, totalPrice));
  };

  return (
    <PointSelectorWrapper>
      <PointSelectorHeader>
        <PointInputTitle>포인트</PointInputTitle>
        <PointInputWrapper>
          <PointText>
            잔여 포인트: {point.totalPoint.toLocaleString()}점
          </PointText>
          <PointButton onClick={handlePointButton}>
            포인트 전액 사용
          </PointButton>
        </PointInputWrapper>
      </PointSelectorHeader>
      <PointSelectorInput>
        <PointInputWrapper>
          <PointInput value={selectedPoints} onChange={handlePointInput}/>
          <PointDescription>점 사용하기</PointDescription>
        </PointInputWrapper>
      </PointSelectorInput>
    </PointSelectorWrapper>
  );
}

export default PointSelector;
