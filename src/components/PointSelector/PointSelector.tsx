import { useRecoilState, useRecoilValue } from "recoil";
import {
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
  const { loadPoint } = useRecoilValue(orderRepository);

  useEffect(() => {
    setSelectedPoints(0);
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
      </PointSelectorHeader>
      <PointSelectorInput>
        <div>잔여 포인트: {point.totalPoint}점</div>
        <button onClick={handlePointButton}>포인트 전액 사용</button>
      </PointSelectorInput>
      <PointSelectorInput>
        <PointInputWrapper>
          <PointInput value={selectedPoints} onChange={handlePointInput} />
          <PointText>점 사용하기</PointText>
        </PointInputWrapper>
      </PointSelectorInput>
    </PointSelectorWrapper>
  );
}

export default PointSelector;
