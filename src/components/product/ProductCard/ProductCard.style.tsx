import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 15px;

  cursor: pointer;

  &:hover {
    h1 {
      text-decoration: underline;
    }

    img {
      transform: scale(1.07);
      transition: transform 0.5s;
    }
  }

  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.4);

  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Name = styled.h1`
  font-size: 1rem;
`;

export const Price = styled.p``;

export const TransparentButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
