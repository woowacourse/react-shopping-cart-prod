import styled from 'styled-components';

function HeaderSkeleton() {
  return (
    <Wrapper>
      <ServerSkeleton />
      <Icon />
      <Icon />
      <Icon />
    </Wrapper>
  );
}

export default HeaderSkeleton;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ServerSkeleton = styled.div`
  width: 60px;
  height: 32px;
  background-color: gainsboro;
`;

const Icon = styled.div`
  width: 44px;
  height: 41px;
  background-color: gainsboro;
`;
