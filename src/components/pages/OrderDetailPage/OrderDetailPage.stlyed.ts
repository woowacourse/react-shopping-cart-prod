import { styled } from 'styled-components';

export const ReceiptWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ReceiptBox = styled.div`
  width: 300px;
  height: fit-content;

  border-radius: 10px;

  background-color: var(--grey-300);

  & > ul {
    padding: 0 20px;
  }

  & li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 16px 0;

    &:last-child {
      margin-top: 30px;
    }
  }
`;

export const ReceiptHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 50px;

  border-bottom: 2px solid var(--grey-200);
`;
