import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 660px;

  @media (max-width: 670px) {
    width: 100%;
  }
`;

export const CountMessage = styled.p`
  width: 100%;
  margin-top: 16px;
  padding: 24px 0;

  line-height: 34px;
  letter-spacing: 0.5px;
  font-size: 20px;
  color: #333333;
`;

export const List = styled.div`
  min-height: 128px;
  max-height: 612px;
  border-top: 1px solid #aaaaaa;
  border-bottom: 1px solid #aaaaaa;

  overflow: scroll;
`;

export const ListItemBox = styled.div`
  padding: 28px 0;

  & {
    border-bottom: 1px solid #cccccc;
  }

  &:last-of-type {
    border: 0;
  }
`;

export const RemoveBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 8px;
`;

export const RemoveLabel = styled.p`
  margin: 0 16px;

  line-height: 20px;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #333333;
`;

export const RemoveButton = styled.button`
  width: 98px;
  height: 36px;

  border: 1px solid #bbbbbb;
  background: #ffffff;

  font-size: 16px;
  color: #333333;
`;
