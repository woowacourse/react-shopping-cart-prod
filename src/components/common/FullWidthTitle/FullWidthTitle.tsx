import { styled } from 'styled-components';
import colors from '../../../colors';

interface FullWidthTitleProps {
  children: string;
}

const FullWidthTitle = ({ children }: FullWidthTitleProps) => {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
};

const Container = styled.div`
  height: 67px;
  border-bottom: 4px solid ${colors.transparentGold};
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${colors.gold};
`;

export default FullWidthTitle;
