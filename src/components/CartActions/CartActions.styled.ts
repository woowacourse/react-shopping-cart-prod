import { styled } from 'styled-components';

export const SelectionActions = styled.div`
  display: flex;
  align-items: center;

  column-gap: 15px;

  @media screen and (max-width: 500px) {
    width: 100%;

    justify-content: space-between;
  }
`;

export const ToggleAllCheckBox = styled.div`
  display: flex;
  align-items: center;

  & > input {
    margin-right: 15px;
  }
`;

export const DeleteSelectedItemButton = styled.button`
  width: 70px;
  height: 30px;
  border: 1px solid var(--grey-300);

  background-color: var(--grey-100);

  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--grey-200);
  }
`;
