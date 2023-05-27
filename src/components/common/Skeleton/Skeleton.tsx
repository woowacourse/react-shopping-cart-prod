import * as styled from './Skeleton.styled';

export const Skeleton = () => {
  return (
    <styled.Skeleton>
      <styled.Image />
      <div>
        <styled.Text />
        <styled.Text />
      </div>
    </styled.Skeleton>
  );
};
