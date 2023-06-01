import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  row-gap: 20px;

  padding-bottom: 40px;
  border-bottom: 1px solid #dddddd;
`;

export const UserInfo = styled.div`
  display: grid;
  row-gap: 10px;
`;

export const UserName = styled.div`
  font-weight: 700;
`;

export const UserAddress = styled.div``;

export const UserContact = styled.div`
  color: #c7c8c9;
`;

export const MemoInput = styled.input`
  font-size: 14px;
  padding: 13px 16px;
  border: 1px solid #dbdcdd;
  outline: none;

  ::placeholder {
    color: #dbdcdd;
  }

  :focus {
    border: 1px solid #333333;
  }
`;

export const CheckBoxLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 10px;
  font-size: 14px;
`;

export const CheckBoxText = styled.div``;
