import { useSelector } from 'react-redux';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';

export const withLogin = (PageComponent, 페이지가_필요로_하는_인증_상태) => {
  const Component = () => {
    const { isLoggedIn } = useSelector((state: any) => state.customer);

    if (isLoggedIn === 페이지가_필요로_하는_인증_상태) {
      return <PageComponent />;
    }

    if (isLoggedIn) {
      return (
        <PageTemplate>
          <ErrorContainer>👻 접근할 수 없는 페이지 입니다 👻</ErrorContainer>
        </PageTemplate>
      );
    }

    return (
      <PageTemplate>
        <ErrorContainer>👻 로그인을 해주세요 👻</ErrorContainer>
      </PageTemplate>
    );
  };

  return Component;
};
