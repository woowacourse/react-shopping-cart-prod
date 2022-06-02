import { InputContainer, Message } from './styles';

interface InputProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isValid?: boolean;
  message?: string;
}

function Input({ htmlFor, label, type, value, onChange, disabled, isValid, message }: InputProps) {
  return (
    <InputContainer>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
      />
      {message && <Message isValid={isValid}>{message}</Message>}
    </InputContainer>
  );
}

export default Input;
