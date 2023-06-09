import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { PATH } from '../../../../constants/path';
import { currentMemberInformationState } from '../../../../store/member';
import * as S from './UserInformation.styles';

const UserInformation = () => {
  const memberInformation = useRecoilValue(currentMemberInformationState);

  return (
    <S.InformationContainer>
      <S.UserRank>{memberInformation.rank}</S.UserRank>
      <Link to={PATH.ORDER}>
        <S.Link>주문 내역</S.Link>
      </Link>
    </S.InformationContainer>
  );
};

export default UserInformation;
