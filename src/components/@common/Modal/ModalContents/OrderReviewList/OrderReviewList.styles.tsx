import styled from 'styled-components';

export const List = styled.ul``;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const Title = styled.h3`
  margin: 0;
  margin-right: 10px;
`;

export const Price = styled.p`
  margin: 15px;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: var(--color-header);
  color: var(--color-brownish-red);
  cursor: pointer;
  border-radius: 16px;
  transition: transform 0.2s ease-in-out;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
