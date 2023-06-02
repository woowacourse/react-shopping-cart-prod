import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  margin-top: 30px;
`;

export const ShowDetailButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 30px;

  font-size: 20px;
  line-height: 24px;
  width: 140px;
  background-color: transparent;
  cursor: pointer;
`;

export const OrderItemsContainer = styled.ul`
  margin-bottom: 50px;
`;

export const OrderDate = styled.div`
  font-size: 24px;
  color: #333333;
  font-weight: 700;
  line-height: 30px;
  width: 250px;
  height: 30px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const OrderTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border: 1px solid #aaaaaa;
  background-color: #f6f6f6;

  padding: 34px 30px;
`;
