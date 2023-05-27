import * as S from './UserInformation.styles';

const UserInformationSkeleton = () => {
  return (
    <S.UserInformationContainer>
      <S.UserInformationContentSkeleton className="skeleton" />
    </S.UserInformationContainer>
  );
};

export default UserInformationSkeleton;
