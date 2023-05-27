import styled from 'styled-components';

const SelectLabel = styled.label`
  position: relative;
  width: 150px;
  padding-right: 10px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.color.white};
  font-size: 14px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  outline: 0;
`;

const SelectOption = styled.option``;

export { SelectLabel, Select, SelectOption };
