import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 390px;
  padding: 50px 0 80px 0;
`;

export const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

export const Subtitle = styled.div`
  font-size: 24px;
  color: rgb(6, 192, 158);
  margin-bottom: 20px;
`;

export const Detail = styled.div`
  position: absolute;
  bottom: -25px;
  right: 50px;

  width: 240px;
  padding: 15px 10px;

  color: white;
  text-align: center;
  font-size: 17px;

  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: rgb(71, 201, 180);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
`;

export const Bold = styled.span`
  color: white;
  font-weight: 700;
  font-size: 19px;
`;

export const CouponContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 500px;
  height: 185px;
  padding: 40px 50px;

  border-radius: 20px;
  background-color: #fdfdfd;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const LeftContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`;

export const RightContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  height: 100%;
  width: 100px;
  border-left: 1px solid #dddddd;
`;

export const Name = styled.div`
  margin-left: 5px;
  font-size: 28px;
  font-weight: 700;
`;

export const DiscountAmount = styled.div`
  font-size: 80px;
  letter-spacing: 1px;
  font-weight: 700;
`;

export const WonText = styled.span`
  margin-left: 4px;
  font-size: 50px;
  font-weight: 700;
`;

export const Description = styled.div`
  font-size: 24px;
  margin-left: 12px;
`;

export const DownLoadButton = styled.button`
  width: 60px;
  height: 100px;
  border-bottom: 5px solid black;

  font-size: 70px;
  font-weight: 900;
  background-color: transparent;
  margin-bottom: 40px;

  cursor: pointer;
`;
