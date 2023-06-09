import * as S from './UserInformation.styles';

const UserInformationSkeleton = () => {
  return (
    <S.InformationContainer>
      <S.InformationContentSkeleton className="skeleton" />
    </S.InformationContainer>
  );
};

export default UserInformationSkeleton;
