import { styled } from 'styled-components';
import errorIcon from '../../../assets/image/error.png';
import colors from '../../../colors';
import Spacer from '../Spacer/Spacer';

interface ErrorComponentProps {
  children: string;
}

const ErrorComponent = ({ children }: ErrorComponentProps) => {
  return (
    <Container>
      <Spacer height={30} />
      <ErrorIcon src={errorIcon} />
      <Message>{children}</Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 600px;
  row-gap: 50px;
  margin: auto;
  flex-direction: column;
`;

const ErrorIcon = styled.img`
  margin: auto;
  width: 250px;
`;

const Message = styled.div`
  margin: auto;
  font-size: 24px;
  text-align: center;
  color: ${colors.gold};
`;

export default ErrorComponent;
