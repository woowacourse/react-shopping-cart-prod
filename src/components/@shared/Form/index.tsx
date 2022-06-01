import Button from '../Button/styles';
import { FormContainer } from './styles';

interface FormProps {
  children: JSX.Element | JSX.Element[];
}

function Form({ children }: FormProps) {
  return (
    <FormContainer>
      {children}
      <Button>확인</Button>
    </FormContainer>
  );
}

export default Form;
