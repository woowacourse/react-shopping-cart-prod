import styled from 'styled-components';

export const AvatarBox = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 50%;
  border: 4px solid ${({ theme: { colors } }) => colors.white};
`;

export const AvatarImage = styled.img`
  width: 100%;
  aspect-ratio: 1 1;
`;
