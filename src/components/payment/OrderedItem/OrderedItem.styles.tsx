import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Wrapper = styled.li`
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.gray};
  margin-bottom: 30px;
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
  font: ${(props) => props.theme.font.small};

  background-color: #eaeaea;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderInfo = styled.div`
  width: 100%;
`;

export const LinkToOrderDetail = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;

  border-bottom: 1px solid ${(props) => props.theme.color.gray};
`;

export const Container = styled.ul``;
