import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

interface AvatarProps {
  name: string;
  onClick: () => void;
}

const Avatar = ({ name, onClick }: AvatarProps) => {
  return <StyledAvatar onClick={onClick}>{name.slice(0, 1)}</StyledAvatar>;
};

export default Avatar;

const StyledAvatar = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  ${flexCenter};
  font-size: 30px;
  border-radius: 50%;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  user-select: none;
`;
