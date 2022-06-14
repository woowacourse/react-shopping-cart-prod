import * as S from './Input.styled';

function Input({
  children,
  id,
  type,
  placeholder,
  pattern,
  maxLength,
  defaultValue,
  value,
  onChange,
  required,
  disabled,
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      {children && <S.Label htmlFor={id}>{children}</S.Label>}
      <S.Input
        id={id}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </>
  );
}

export default Input;
