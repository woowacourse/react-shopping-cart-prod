import { Styled } from './styles';

interface checkBoxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
}

const CheckBox = ({ id, checked, onChange }: checkBoxProps) => {
  return (
    <>
      <Styled.Input id={id} type='checkbox' checked={checked} onChange={onChange}></Styled.Input>
      <Styled.Label htmlFor={id}></Styled.Label>
    </>
  );
};

export default CheckBox;
