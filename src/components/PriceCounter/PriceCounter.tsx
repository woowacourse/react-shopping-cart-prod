import { ChangeEvent, useState } from 'react';
import { DiscountBox } from '../DiscountBox';
import PurchaseBox from '../PurchaseBox';

const userPoint = 1000;

function PriceCounter() {
  const [point, setPoint] = useState('');

  const onChangePoint = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > userPoint) setPoint(String(userPoint));
    else setPoint(e.target.value);
  };

  const onClickAllPoint = () => {
    setPoint(String(userPoint));
  };

  return (
    <>
      <DiscountBox
        userPoint={userPoint}
        point={point}
        onChangePoint={onChangePoint}
        onClickAllPoint={onClickAllPoint}
      />
      <PurchaseBox point={point} />
    </>
  );
}

export default PriceCounter;
