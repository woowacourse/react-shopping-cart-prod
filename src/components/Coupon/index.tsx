import styled from 'styled-components';

import { CouponType, MemberCouponType } from '@Types/index';

interface CouponProps {
  coupon: MemberCouponType;
  isSelect?: boolean;
  handleClick?: () => void;
  handleDeleteButton?: () => void;
}

const Coupon = ({ coupon, isSelect = false, handleClick, handleDeleteButton }: CouponProps) => {
  return (
    <Container isSelect={isSelect}>
      <LeftContents>
        <IconContainer>
          <IconContainerLeft />
          <IconContainerRight>
            <IconInitial isUsed={coupon.isUsed}>C</IconInitial>
          </IconContainerRight>
          <Hole $position="bottom:-6px" $backgroundColor="#cccccc" />
          <Hole $position="top:-6px" $backgroundColor="#eeeeee" />
        </IconContainer>
      </LeftContents>
      <RightContents>
        <CenterContents>
          <div>
            <Name>{coupon.name}</Name>
            <Description isUsed={coupon.isUsed}>{coupon.description}</Description>
          </div>
          <Expiration>
            2023-5-30 ~ {coupon.isUsed && <DeleteButton onClick={handleDeleteButton}>삭제하기</DeleteButton>}
          </Expiration>
        </CenterContents>
        <ButtonWrapper>
          {coupon.isUsed ? (
            <UsedButton>사용완료</UsedButton>
          ) : (
            <UseButton onClick={handleClick}>{isSelect ? '✔' : '사용'}</UseButton>
          )}
        </ButtonWrapper>
      </RightContents>
    </Container>
  );
};

const Container = styled.li<{ isSelect: boolean }>`
  position: relative;
  display: flex;

  height: 160px;
  border: 1px solid ${(props) => (props.isSelect ? '#b6bebc' : '#dddddd')};
  border-radius: 5px;

  overflow: hidden;

  z-index: 1;

  @media only screen and (max-width: 768px) {
    zoom: 0.6;
  }
`;

const LeftContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 100%;

  background-color: #f7f7f7;
`;

const IconContainerRight = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 68px;
  height: 50px;
  border: 2px solid #bbbbbb;
  border-left: none;
  background-color: #eeeeee;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Hole = styled.div<{ $position: string; $backgroundColor: string }>`
  position: absolute;
  left: 17px;
  ${(props) => props.$position};

  width: 8px;
  height: 8px;
  border-radius: 4px;
  border: 2px solid #bbbbbb;
  background-color: ${(props) => props.$backgroundColor};
`;

const IconContainerLeft = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 50px;
  border: 2px solid #bbbbbb;
  border-right: 3px dotted #cccccc;
  background-color: #eeeeee;
`;

const IconInitial = styled.div<{ isUsed: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: white;

  color: ${(props) => (props.isUsed ? '#aaaaaa' : 'rgb(6, 192, 158)')};
  font-size: 20px;
  font-weight: 900;
`;

const CenterContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px 0;
`;

const Name = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: #777777;
`;

const Description = styled.div<{ isUsed: boolean }>`
  font-size: 20px;
  font-weight: 600;
  margin-top: 12px;
  color: ${(props) => (props.isUsed ? '#aaaaaa' : '#222222')};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Expiration = styled.div``;

const RightContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
  column-gap: 30px;
`;

const DeleteButton = styled.span`
  margin: 0 0 0 15px;
  font-size: 16px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const UseButton = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 5px;

  font-size: 17px;
  font-weight: 600;
  color: white;
  background-color: rgb(71, 201, 180);

  cursor: pointer;
`;

const UsedButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;

  font-size: 17px;
  font-weight: 600;
  color: white;
  background-color: #cccccc;

  cursor: pointer;
`;

export default Coupon;
