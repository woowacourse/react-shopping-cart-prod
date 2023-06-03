import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import useFetch from '../../../hooks/api/useFetch';
import CouponInfo from '../../../types/coupon';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../../../constant';

interface CouponSelectRadioProps {
  selected: CouponInfo | null;
  setSelected: (coupon: CouponInfo | null) => void;
}

const CouponSelectRadio = (props: CouponSelectRadioProps) => {
  const { selected, setSelected } = props;

  const serverName = useRecoilValue(serverNameState);
  const url = ServerUtil.getUserCouponsUrl(serverName);

  useEffect(() => {
    setSelected(null);
  }, [serverName]);

  const { getData } = useFetch<{ coupons: CouponInfo[] }>(url, USER_AUTH_TOKEN);

  const data = getData();

  return (
    <fieldset>
      <legend>쿠폰 선택하기: 현재 선택된 쿠폰 - {selected ? selected.name : '없음'}</legend>
      <div>
        <label htmlFor="empty">
          <input
            type="radio"
            id="empty"
            checked={selected === null}
            onClick={() => setSelected(null)}
            readOnly
          />
          <p>선택 안함</p>
        </label>
        {data?.coupons.map((coupon) => {
          const { id, name, type, amount } = coupon;

          return (
            <label key={id} htmlFor={id.toString()}>
              <input
                type="radio"
                id={id.toString()}
                checked={!!selected && selected.id === id}
                onClick={() => setSelected(coupon)}
                readOnly
              />
              <p>{name}</p>
              <span aria-hidden="true">|</span>
              <p>{`${amount}${type === 'percent' ? '%' : '원'} 할인`}</p>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default CouponSelectRadio;
