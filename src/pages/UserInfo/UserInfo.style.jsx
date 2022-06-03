import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const List = styled.ul`
  margin: 100px 0;

  display: flex;
  flex-direction: column;
  gap: 55px;
`;

export const ListItem = styled.li`
  display: flex;
  gap: 15px;

  font-size: 20px;
  font-weight: bold;
`;

export const ListItemTitle = styled.p`
  width: 200px;
  padding-right: 15px;
  border-right: ${({ theme }) => theme.colorConfig.black} 2px solid;
  text-align: right;
`;

export const ListItemContent = styled.p``;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 55px;
  width: 600px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 40px;
`;
