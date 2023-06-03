import { TfiDownload } from 'react-icons/tfi';
import { LuBird } from 'react-icons/lu';
import { styled } from 'styled-components';

interface CouponProps {
  couponName: string;
  type: string;
  amount: number;
  footer?: string;
  onDownloadClick?: () => void;
}

const Coupon = (props: CouponProps) => {
  const { couponName, type, amount, footer, onDownloadClick } = props;

  const unit = type === 'percent' ? '%' : '원';

  return (
    <CouponDiv aria-label="쿠폰">
      <CouponInfoDiv aria-label="쿠폰 설명">
        <NameParagraph>{couponName}</NameParagraph>
        <DiscountParagraph>{`${amount}${unit} 할인 쿠폰`}</DiscountParagraph>
        <FooterParagraph>{footer || ' '}</FooterParagraph>
      </CouponInfoDiv>
      {onDownloadClick ? (
        <DownloadButton type="button" aria-label="쿠폰 받기" onClick={onDownloadClick}>
          <TfiDownload color="#ffffff" size="25px" />
        </DownloadButton>
      ) : (
        <IconDiv>
          <LuBird color="#ffffff" size="25px" />
        </IconDiv>
      )}
    </CouponDiv>
  );
};

const CouponDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 282px;
  height: 141px;

  border: 2px solid #ffffff;
  border-radius: 15px;
  background-color: #333333;
`;

const CouponInfoDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 7px;

  margin: auto auto auto 20px;
  width: 180px;

  & > p {
    width: 100%;

    line-height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const NameParagraph = styled.p`
  color: #ffffff;
  font-size: 0.8rem;
`;

const DiscountParagraph = styled.p`
  color: #ffffff;
  font-size: 1.25rem;
`;

const FooterParagraph = styled.p`
  color: #888888;
  font-size: 0.8rem;
`;

const iconWrapper = `
  display: flex;
  justify-content: center;
  align-items: center;

  margin: auto 20px auto auto;
  width: 55px;
  height: 55px;

  border: 3px solid #ffffff;
  border-radius: 50%;
  background-color: #333333;
`;

const DownloadButton = styled.button`
  ${iconWrapper}
  cursor: pointer;

  &:hover {
    background-color: #525252;
  }
`;

const IconDiv = styled.div`
  ${iconWrapper}
`;

export default Coupon;
