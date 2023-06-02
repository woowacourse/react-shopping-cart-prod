import styled from 'styled-components';

export const Container = styled.div``;

export const AmountUnusedCoupon = styled.div`
  margin-left: 10px;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
`;

export const Number = styled.span`
  color: rgb(6, 192, 158);
`;

export const List = styled.ul`
  margin-top: 30px;
  max-height: 730px;
  overflow-y: auto;

  & > li {
    margin-bottom: 20px;
  }
`;
