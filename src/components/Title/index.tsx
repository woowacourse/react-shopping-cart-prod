import Styled from './index.style';

interface TitleProps {
  subTitle?: string;
  mainTitle: string;
}

const Title = ({ subTitle, mainTitle }: TitleProps) => {
  return (
    <Styled.Container>
      <Styled.SubTitle>{subTitle}</Styled.SubTitle>
      <Styled.MainTitle>{mainTitle}</Styled.MainTitle>
    </Styled.Container>
  );
};

export default Title;
