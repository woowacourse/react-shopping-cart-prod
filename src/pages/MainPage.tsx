import { useRecoilValue, useSetRecoilState } from 'recoil';
import ProductList from '../components/main/ProductList';
import { ProductListWrapper } from '../style/ContentLayout';
import memberState from '../store/MemberState';
import { serverState } from '../store/ServerState';
import useGet from '../hooks/useGet';
import { MEMBER_BASE_URL } from '../constants/url';
import { useEffect } from 'react';
import { MemberInfo } from '../types';

const MainPage = () => {
  const setMember = useSetRecoilState(memberState);
  const serverUrl = useRecoilValue(serverState);

  const { data: memberData } = useGet<MemberInfo>(`${serverUrl}${MEMBER_BASE_URL}`);

  useEffect(() => {
    if (memberData) setMember(memberData);
  }, [memberData, setMember]);

  return (
    <ProductListWrapper>
      <ProductList />
    </ProductListWrapper>
  );
};

export default MainPage;
