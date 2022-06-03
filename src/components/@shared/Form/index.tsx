import { FormContainer } from './styles';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: JSX.Element | JSX.Element[];
}

function Form({ onSubmit, children }: FormProps) {
  return <FormContainer onSubmit={onSubmit}>{children}</FormContainer>;
}

export default Form;
