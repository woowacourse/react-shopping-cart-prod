import { TfiDownload } from 'react-icons/tfi';
import { LuBird } from 'react-icons/lu';
import { styled } from 'styled-components';

interface CounponProps {
  couponName: string;
  header?: string;
  footer?: string;
  onDownloadClick?: () => void;
}

const Counpon = (props: CounponProps) => {
  const { couponName, header, footer, onDownloadClick } = props;

  return (
    <CouponDiv aria-label="쿠폰">
      <CouponInfoDiv aria-label="쿠폰 설명">
        <HeaderParagraph>{header || ' '}</HeaderParagraph>
        <NameParagraph>{couponName}</NameParagraph>
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
    display: flex;
    align-items: center;

    width: 100%;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const HeaderParagraph = styled.p`
  color: #ffffff;
  font-size: 0.8rem;
`;

const NameParagraph = styled.p`
  color: #ffffff;
  font-size: 1.3rem;
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

export default Counpon;
