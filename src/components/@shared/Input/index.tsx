import { InputContainer, Message } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
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
        minLength={props.minLength}
        maxLength={props.maxLength}
        disabled={props.disabled}
        onBlur={props.onBlur}
        required
      />
      {props.message && <Message isValid={props.isValid}>{props.message}</Message>}
    </InputContainer>
  );
}

export default Input;
