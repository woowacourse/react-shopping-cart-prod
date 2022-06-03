import { InputContainer, Message } from './styles';

interface InputProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  isValid?: boolean;
  message?: string;
}

function Input({ ...props }: InputProps) {
  return (
    <InputContainer>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        type={props.type}
        id={props.htmlFor}
        value={props.value}
        onChange={props.onChange}
        maxLength={props.maxLength}
        disabled={props.disabled}
        required
      />
      {props.message && <Message isValid={props.isValid}>{props.message}</Message>}
    </InputContainer>
  );
}

export default Input;
