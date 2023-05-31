import CouponList from '../CouponList/CouponList';
import styles from './style.module.css';

const CouponIssuePageSection = () => {
  return (
    <>
      <div className={styles.couponIssueHeader}>쿠폰함</div>
      <hr />
      <CouponList />
    </>
  );
};

export default CouponIssuePageSection;
