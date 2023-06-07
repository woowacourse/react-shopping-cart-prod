import { ChangeEventHandler } from 'react';
import { styled } from 'styled-components';
import colors from '../../../colors';
import { TbCheck } from 'react-icons/tb';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: (value: number) => void;
}

const Checkbox = ({ id, checked = false, onChange }: CheckboxProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(Number(e.target.id));
  };

  return (
    <>
      <label>
        <RealCheckbox
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
        />
        <VisualCheckbox>
          <TbCheck />
        </VisualCheckbox>
      </label>
    </>
  );
};

const RealCheckbox = styled.input`
  appearance: none;
`;

const VisualCheckbox = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 1px solid ${colors.gold};
  border-radius: 2px;
  transition: 0.15s;
  cursor: pointer;

  & * {
    opacity: 0;
    color: ${colors.pureBlack};
    font-size: 26px;
    transition: 0.15s;
  }

  ${RealCheckbox}:checked ~ & {
    background-color: ${colors.gold};
    box-shadow: 0 0 10px ${colors.gold};
  }

  ${RealCheckbox}:checked ~ & * {
    opacity: 1;
  }
`;

export default Checkbox;
