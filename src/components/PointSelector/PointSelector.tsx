import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
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
import { ChangeEvent, useEffect } from "react";
import {
  orderRepository,
  pointState,
  selectedPointState,
} from "../../app/recoil/orderAtom";

function PointSelector() {
  const point = useRecoilValue(pointState);
  const [selectedPoints, setSelectedPoints] =
    useRecoilState(selectedPointState);
  const resetSelectedPoints = useResetRecoilState(selectedPointState);
  const { loadPoint } = useRecoilValue(orderRepository);

  useEffect(() => {
    resetSelectedPoints();
    loadPoint();
  }, []);

  const handlePointInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputNumber = parseInt(inputValue.length > 0 ? inputValue : "0");
    const newPoint =
      inputNumber > point.totalPoint ? point.totalPoint : inputNumber;
    setSelectedPoints(newPoint);
  };

  const handlePointButton = () => {
    setSelectedPoints(point.totalPoint);
  };

  return (
    <PointSelectorWrapper>
      <PointSelectorHeader>
        <PointInputTitle>포인트 사용하기</PointInputTitle>
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
          <PointInput value={selectedPoints} onChange={handlePointInput} />
          <PointDescription>점 사용하기</PointDescription>
        </PointInputWrapper>
      </PointSelectorInput>
    </PointSelectorWrapper>
  );
}

export default PointSelector;
