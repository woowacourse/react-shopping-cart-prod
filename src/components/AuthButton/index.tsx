import Styled from './index.style';

interface AuthButtonProps {
  actionType: string;
  action: Function;
  isDisabled?: boolean;
  color?: string;
}

const AuthButton = ({ actionType, action, isDisabled, color }: AuthButtonProps) => {
  return (
    <Styled.Button disabled={isDisabled} onClick={action} color={color}>
      {actionType}
    </Styled.Button>
  );
};

export default AuthButton;
