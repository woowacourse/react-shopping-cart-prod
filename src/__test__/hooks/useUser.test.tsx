import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { useUser } from '@hooks/recoil/user/useUser';
import { USER_INFORMATION } from '@constants/userConstant';

describe('useServer 훅 테스트', () => {
  test('user 초기 값이 잘 적용되었는 지 확인한다.', () => {
    const { result } = renderHook(() => useUser(), { wrapper: RecoilRoot });

    expect(result.current.userInfo).toBe(USER_INFORMATION[0]);
  });
  test('handleUser 통해 서버가 변경되는 지 확인한다.', () => {
    const { result } = renderHook(() => useUser(), { wrapper: RecoilRoot });
    const { userInfo, handleUser } = result.current;

    act(() => {
      handleUser(USER_INFORMATION[1].nickname);
    });

    waitFor(() => {
      expect(userInfo).toBe(USER_INFORMATION[1]);
    });
  });
});
