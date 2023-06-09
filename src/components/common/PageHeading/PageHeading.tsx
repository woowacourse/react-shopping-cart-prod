import Heading from '../Heading/Heading';
import * as S from './PageHeading.styles';

interface PageHeadingProps {
  children: string;
}

const PageHeading = ({ children }: PageHeadingProps) => {
  return (
    <Heading css={S.headingStyle} size="small">
      {children}
    </Heading>
  );
};

export default PageHeading;
