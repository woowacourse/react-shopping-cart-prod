import FlexBox from 'components/@common/FlexBox';
import UserItem from 'components/UserItem/UserItem';
import ROUTE_PATH from 'constants/routePath';
import { users } from 'constants/user';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { cartProductIdStoreState } from 'state/cartProductIdStore';
import { cartProductsState } from 'state/cartProducts';
import { userState } from 'state/userState';
import styled from 'styled-components';

const UserSelectPage = () => {
  const navigate = useNavigate();

  const currentUser = useRecoilValue(userState);
  const resetCartProduct = useResetRecoilState(cartProductsState);
  const resetCartProductIdStore = useResetRecoilState(cartProductIdStoreState);

  const handleOnClick = () => {
    resetCartProduct();
    resetCartProductIdStore();
    navigate(ROUTE_PATH.root);
  };

  return (
    <UserSelectPageContainer flexDirection="column">
      <PageTitle>사용자 선택</PageTitle>
      {users.map((user, index) => (
        <UserItem key={index} currentUser={currentUser} user={user} onClick={handleOnClick} />
      ))}
    </UserSelectPageContainer>
  );
};

export default UserSelectPage;

const UserSelectPageContainer = styled(FlexBox)`
  width: 100%;
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
`;
