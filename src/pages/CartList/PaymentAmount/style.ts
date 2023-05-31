import styled from 'styled-components';

type WrapperProps = {
  scrollPosition: number;
};

export const Wrapper = styled.div<WrapperProps>`
  position: ${(props) => props.scrollPosition > 160 && 'fixed'};
  min-width: 360px;
  max-width: 360px;
  display: grid;
  row-gap: 20px;

  top: ${(props) => props.scrollPosition > 160 && '90'}px;

  @media only screen and (max-width: 1200px) {
    // 테블릿
    position: relative;
    top: 0;
    min-width: 100%;
    max-width: 100%;
  }
`;

export const Container = styled.div`
  /* border: 1px solid #dddddd; */
  color: #333333;
  background-color: #dddddd;
  display: grid;
  row-gap: 2px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  @media only screen and (max-width: 1200px) {
    // 테블릿
    margin-bottom: 40px;
  }
`;

export const Title = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  background-color: #ffffff;
  padding: 20px 30px;
`;

export const ExpectedAmountLayout = styled.div`
  background-color: #ffffff;
  padding: 20px 30px;
  display: grid;
  row-gap: 15px;
`;

export const AmountWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  :nth-child(5) {
    padding: 10px 0px;
  }

  :nth-child(2) {
    padding-top: 15px;
    border-top: 1px solid #dddddd;
    color: #06c09e;
  }

  :nth-child(3) {
    padding-bottom: 15px;
    border-bottom: 1px solid #dddddd;
    color: #06c09e;
  }
`;

export const AmountCategory = styled.div`
  position: relative;
`;

export const Amount = styled.div`
  position: relative;
`;

export const DiscountAmount = styled.div`
  position: absolute;
  right: 0;
  bottom: -22px;
`;

export const ResetButton = styled.div`
  position: absolute;
  right: -24px;
  top: -3px;
  font-size: 30px;
  cursor: pointer;
`;
