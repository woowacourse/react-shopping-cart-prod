import styled from 'styled-components';

type Props = {
  content: string;
};

function Alert({ content }: Props) {
  return <StyledAlert>{content}</StyledAlert>;
}

const StyledAlert = styled.div`
  width: 200px;
  height: 100px;
  background: black;
`;

export default Alert;
