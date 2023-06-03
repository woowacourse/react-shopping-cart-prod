import { useRecoilValue } from "recoil";
import { PointInput, PointInputTitle, PointInputWrapper, PointSelectorHeader, PointSelectorInput, PointSelectorWrapper, PointText } from "./PointSelector.style";
import { ChangeEvent, useEffect } from 'react';
import { orderRepository, pointState, selectedPointState } from "../../app/recoil/orderAtom";

function PointSelector() {

  const point = useRecoilValue(pointState);
  const selectedPoints = useRecoilValue(selectedPointState);
  const { loadPoint } = useRecoilValue(orderRepository);

  useEffect(() => {
    loadPoint();
  }, []);

  const handlePoints = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };


  return (
    <PointSelectorWrapper>
      <PointSelectorHeader>
        <PointInputTitle>포인트 사용하기</PointInputTitle>
      </PointSelectorHeader>
      <PointSelectorInput>
        <div>잔여 포인트: {point.totalPoint}점</div>
        <button>포인트 전액 사용</button>
      </PointSelectorInput>
      <PointSelectorInput>
        <PointInputWrapper>
          <PointInput value={selectedPoints} onChange={handlePoints} />
          <PointText>점 사용하기</PointText>
        </PointInputWrapper>
      </PointSelectorInput>
    </PointSelectorWrapper>
  );
}

export default PointSelector;
