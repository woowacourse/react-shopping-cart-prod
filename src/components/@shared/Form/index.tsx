import { FormContainer } from './styles';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: JSX.Element | JSX.Element[];
}

function Form({ onSubmit, children }: FormProps) {
  return <FormContainer onSubmit={onSubmit}>{children}</FormContainer>;
}

export default Form;
