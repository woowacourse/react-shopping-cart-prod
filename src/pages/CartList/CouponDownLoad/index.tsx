import { CouponType } from '@Types/index';

import { DownloadIcon } from '@Asset/icon';

import * as S from './style';

interface CouponDownload {
  coupon: CouponType;
  isDownLoaded?: boolean;
  handleClick: () => void;
}

const CouponDownload = ({ coupon, isDownLoaded = true, handleClick }: CouponDownload) => {
  return (
    <S.Container>
      <S.Title>쿠폰 다운받기</S.Title>
      <S.Subtitle>지금 다운받으세요!</S.Subtitle>
      <S.CouponContainer>
        <S.Detail>
          {isDownLoaded ? (
            '이미 다운로드 된 쿠폰입니다.'
          ) : (
            <>
              클릭 시 바로 <S.Bold>다운로드!</S.Bold>
            </>
          )}
        </S.Detail>
        <S.LeftContents>
          <S.Name>{coupon.name}</S.Name>
          <S.DiscountAmount>
            {coupon.discountAmount.toLocaleString()}
            <S.WonText>원</S.WonText>
          </S.DiscountAmount>
          <S.Description>{coupon.description}</S.Description>
        </S.LeftContents>
        <S.RightContents>
          <S.DownLoadButton onClick={handleClick}>{isDownLoaded ? '✔' : <DownloadIcon />}</S.DownLoadButton>
        </S.RightContents>
      </S.CouponContainer>
    </S.Container>
  );
};

export default CouponDownload;
