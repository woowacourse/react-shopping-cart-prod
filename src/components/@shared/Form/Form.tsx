import * as S from './Form.styled';

function Form({
  onSubmit,
  children,
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <S.Form onSubmit={onSubmit}>{children}</S.Form>;
}

export default Form;
