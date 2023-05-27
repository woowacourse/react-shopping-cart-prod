import styled from 'styled-components';

const UserPointInfo = () => {
  return (
    <UserPointInfoContainer>
      <UserPointInfoTitle>포인트</UserPointInfoTitle>
      <PointContainer>
        <HeldPointWrapper>
          <HeldPointTitle>보유 포인트</HeldPointTitle>
          <HeldPointAmount>0원</HeldPointAmount>
        </HeldPointWrapper>
        <UsedPointWrapper>
          <label>사용 포인트</label>
          <PointInput />
          <span>원</span>
        </UsedPointWrapper>
      </PointContainer>
    </UserPointInfoContainer>
  );
};

const UserPointInfoContainer = styled.div`
  width: 448px;
  height: 200px;
  margin-bottom: 40px;
`;

const UserPointInfoTitle = styled.div`
  height: 71px;
  padding: 25px 0 20px 30px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
  font-size: 22px;
`;

const PointContainer = styled.div`
  padding: 10px 0 20px 30px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const HeldPointWrapper = styled.div`
  display: flex;
  margin: 30px 0;
`;

const HeldPointTitle = styled.p`
  margin-right: 30px;
`;

const HeldPointAmount = styled.p`
  width: 180px;
  text-align: right;
`;

const UsedPointWrapper = styled.div`
  display: flex;
`;

const PointInput = styled.input`
  margin-left: 30px;
  padding: 0 5px;
  width: 165px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  outline: none;
  font-size: 18px;
  font-weight: 600;
  text-align: right;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
  }
`;

export default UserPointInfo;
