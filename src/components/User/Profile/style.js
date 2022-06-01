import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLOR.BLACK};
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const Info = styled.div`
  width: 100%;
  font-size: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.COLOR.GREY_300};
`;

export const NameConverter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
`;
