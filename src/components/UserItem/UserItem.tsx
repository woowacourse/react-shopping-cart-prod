import FlexBox from 'components/@common/FlexBox';
import { useRecoilState } from 'recoil';
import { userState } from 'state/userState';
import styled from 'styled-components';

type UserItemProps = {
  currentUser: {
    id: string;
    password: number;
  };
  user: {
    id: string;
    password: number;
  };
  onClick: () => void;
};

const UserItem = ({ currentUser, user, onClick }: UserItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUserState] = useRecoilState(userState);
  const isChecked = user.id === currentUser.id;

  const handleOnClick = () => {
    const { id, password } = user;
    setUserState({ id, password });
    onClick();
  };

  return (
    <Item isChecked={isChecked} flexDirection="row" justify="space-between" align="center" gap="8px">
      <div>{user.id}</div>
      <div>{user.password}</div>
      <Button onClick={handleOnClick}>선택</Button>
    </Item>
  );
};

export default UserItem;

const Item = styled(FlexBox)<{ isChecked: boolean }>`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  background-color: ${({ isChecked }) => (isChecked ? '#67656566' : '#fff')};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  :hover {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
  }
`;

const Button = styled.button`
  margin-left: auto;
  padding: 10px 15px;
  background-color: #c0392b;
  color: #fff;

  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;

  border: none;
  border-radius: 3px;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  :hover {
    background-color: #e74c3c;
  }
`;
