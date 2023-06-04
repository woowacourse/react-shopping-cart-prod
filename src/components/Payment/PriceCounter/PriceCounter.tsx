import { DiscountBox } from './DiscountBox';
import { useRecoilValue } from 'recoil';
import { memberPointState } from '../../../recoil/userAtoms';
import { FinalPriceBox } from './FinalPriceBox';

function PriceCounter() {
  const userPointInfo = useRecoilValue(memberPointState);
  if (!userPointInfo) return <></>;
  const { totalPoint } = userPointInfo;

  return (
    <>
      <DiscountBox userPoint={totalPoint} />
      <FinalPriceBox />
    </>
  );
}

export default PriceCounter;
