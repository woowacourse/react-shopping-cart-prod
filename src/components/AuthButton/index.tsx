import Styled from './index.style';

interface AuthButtonProps {
  actionType: string;
  action: Function;
  isDisabled?: boolean;
}

const AuthButton = ({ actionType, action, isDisabled }: AuthButtonProps) => {
  return (
    <Styled.Button disabled={isDisabled} onClick={action}>
      {actionType}
    </Styled.Button>
  );
};

export default AuthButton;
