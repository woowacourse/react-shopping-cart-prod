import * as S from './PageHeading.styles';

interface PageHeadingProps {
  children: string;
}

const PageHeading = ({ children }: PageHeadingProps) => {
  return <S.PageHeading size="small">{children}</S.PageHeading>;
};

export default PageHeading;
