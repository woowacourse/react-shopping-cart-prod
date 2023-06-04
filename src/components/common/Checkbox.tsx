import { styled } from 'styled-components';

const CheckboxElement = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;

  margin-left: 30px;

  accent-color: #0078ff;
`;

type CheckboxProps = {
  value: boolean;
  onChange?: (value: boolean) => void;
};

const Checkbox = (props: CheckboxProps) => {
  const { value, onChange } = props;

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.checked);
  };

  return <CheckboxElement checked={value} onChange={handleCheckboxChange} />;
};

export default Checkbox;
