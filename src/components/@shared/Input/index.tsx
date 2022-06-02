import { InputContainer } from './styles';

interface InputProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
}

function Input({ htmlFor, label, type, value, onChange, disabled, errorMessage }: InputProps) {
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
      {errorMessage !== '' && <p>{errorMessage}</p>}
    </InputContainer>
  );
}

export default Input;
