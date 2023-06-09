import styled, { css } from 'styled-components';
import CustomInput from './CustomInput';

interface OptionProps {
  label: string;
  checked: boolean;
  onClick: () => void;
  selectedOption: string;
  customInputChange: (value: number) => void;
  point: {
    checkedBy: string;
    appliedPoint: string | number;
  };
  userMaxPoint: number;
}

const Option = ({ label, checked, onClick, selectedOption, customInputChange, point, userMaxPoint }: OptionProps) => {
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    customInputChange(value);
  };
  return (
    <Item isClicked={checked} onClick={onClick}>
      <label>
        <input type="radio" checked={checked} onChange={onClick} />
        {label}
      </label>
      {selectedOption === 'custom' && checked && (
        <CustomInput
          min={0}
          max={userMaxPoint}
          placeholder="사용할 포인트"
          onChange={handleCustomInputChange}
          defaultValue={point.checkedBy === 'custom' ? point.appliedPoint : ''}
        />
      )}
    </Item>
  );
};

export default Option;

type ItemProps = {
  isClicked: boolean;
};

const Item = styled.li<ItemProps>`
  display: flex;
  padding: 20px 16px;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  min-height: 56px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 8px;

  label {
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  :hover {
    background-color: rgb(243, 245, 247);
  }

  ${({ isClicked }) =>
    isClicked &&
    css`
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
      background-color: rgb(243, 245, 247);
    `}
`;
