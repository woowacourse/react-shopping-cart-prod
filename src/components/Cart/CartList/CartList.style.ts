import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 1;
  }
`;

export const CartListWrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 20px;
`;

export const CartListTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 33px;

  letter-spacing: 0.5px;

  margin: 0 25px 12px 25px;
`;

export const Label = styled.label`
  width: 28px;
  height: 28px;
`;

export const CartListController = styled.div`
  display: flex;
  align-items: center;
`;

export const CartListCheckCounter = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: 0.5px;
  padding: 10px 0px 10px 0px;
  margin: 0px 15px 0px 15px;
`;

export const CartsDeleteButton = styled.button`
  text-align: center;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
  width: 100px;
  height: 36px;
`;
