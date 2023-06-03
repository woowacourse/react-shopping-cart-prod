import { S } from './PointInput.styles';

const PointInfo = ({ memberPoint }: { memberPoint: number }) => {
  return (
    <section>
      <S.PointLabel>보유 포인트</S.PointLabel>
      <span>{`${memberPoint.toLocaleString()}원`}</span>
    </section>
  );
};

export default PointInfo;
