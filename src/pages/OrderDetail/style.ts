import styled from 'styled-components';

export const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  line-height: 37px;
  color: ${(props) => props.theme.color.gray100};

  border-bottom: 2px solid ${(props) => props.theme.color.gray100};
  padding-bottom: 30px;
`;

export const Container = styled.div``;

export const ShowDetailButton = styled.button`
  font-size: 20px;
  line-height: 24px;
  width: 140px;
  background-color: transparent;
  cursor: pointer;
`;

export const OrderItemsContainer = styled.ul`
  width: 100%;
`;

export const OrderID = styled.div`
  font-size: 20px;
  line-height: 24px;
  width: 200px;

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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  max-width: 1320px;
  row-gap: 30px;
`;
