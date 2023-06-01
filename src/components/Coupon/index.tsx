import styled from 'styled-components';

interface CouponProps {
  name?: string;
  description?: string;
  isSelect?: boolean;
  handleClick?: () => void;
}

const Coupon = ({ name, description, isSelect = false, handleClick }: CouponProps) => {
  return (
    <Container isSelect={isSelect}>
      <LeftContents>
        <IconContainer>
          <IconContainerLeft />
          <IconContainerRight>
            <IconInitial>C</IconInitial>
          </IconContainerRight>
          <Hole $position="bottom:-6px" $backgroundColor="#cccccc" />
          <Hole $position="top:-6px" $backgroundColor="#eeeeee" />
        </IconContainer>
      </LeftContents>
      <RightContents>
        <CenterContents>
          <div>
            <Name>{name}</Name>
            <Description>{description}</Description>
          </div>
          <Expiration>2023-5-30 ~</Expiration>
        </CenterContents>
        <ButtonWrapper>
          <UseButton onClick={handleClick}>{isSelect ? '✔' : '사용'}</UseButton>
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

const IconInitial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: white;

  color: rgb(6, 192, 158);
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

const Description = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 12px;
  color: #333333;

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

export default Coupon;
