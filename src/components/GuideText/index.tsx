import Styled from './index.style';

interface GuideTextProps {
  guide: string;
  path: string;
  destination: string;
}

const GuideText = ({ guide, destination, path }: GuideTextProps) => {
  return (
    <Styled.Container>
      <Styled.Guide>{guide}</Styled.Guide>
      <Styled.Link to={path}>{destination} →</Styled.Link>
    </Styled.Container>
  );
};

export default GuideText;
