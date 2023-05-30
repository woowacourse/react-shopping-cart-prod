import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Wrapper = styled.li`
  min-height: 300px;
  border: 1px solid gray;
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: #eaeaea;
`;

export const OrderNumber = styled.div`
  width: 100%;
  padding: 20px;
`;

export const LinkToOrderDetail = styled(Link)`
  text-decoration: none;
  width: 150px;
  padding: 20px;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;

  border-bottom: 1px solid black;
`;

export const Container = styled.ul``;
