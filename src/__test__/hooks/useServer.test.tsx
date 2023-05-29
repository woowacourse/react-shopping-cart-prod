import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { SERVER_NAME } from '@constants/serverUrlConstants';
import { useServer } from '@hooks/useServer';

describe('useServer 훅 테스트', () => {
  test('server 초기 값이 잘 적용되었는 지 확인 ', () => {
    const { result } = renderHook(() => useServer(), { wrapper: RecoilRoot });

    expect(result.current.server).toBe(SERVER_NAME[0]);
  });
  test('handleServer 통해 서버가 변경되는 지 확인 ', () => {
    const { result } = renderHook(() => useServer(), { wrapper: RecoilRoot });
    const { server, handleServer } = result.current;

    act(() => {
      handleServer(SERVER_NAME[2]);
    });

    waitFor(() => {
      expect(server).toBe('우가');
    });
  });
});
