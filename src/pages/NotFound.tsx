import { GuideBox, Header, Page } from "../components";

const NotFound = () => {
  return (
    <>
      <Header />
      <Page>
        <GuideBox
          icon="🖐🏻"
          message="요청하신 페이지를 찾을 수 없어요"
          guideMessage="홈으로"
        />
      </Page>
    </>
  );
};

export default NotFound;
