import { InputContainer } from './styles';

interface InputProps {
  htmlFor: string;
  label: string;
  type?: string;
  disabled?: boolean;
}

function Input({ htmlFor, label, type, disabled }: InputProps) {
  return (
    <InputContainer>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type} id={htmlFor} disabled={disabled} />
    </InputContainer>
  );
}

export default Input;
