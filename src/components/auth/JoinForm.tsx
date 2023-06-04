import type { LoginResponse } from '../../types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';

import Input from '../common/Input';
import InputBox from '../common/InputBox';

import useToast from '../../hooks/useToast';
import { tokenState, serverNameState } from '../../recoil/state';
import { postJoin, postLogin } from '../../api';
import { API_ERROR_MESSAGE, API_INFO_MESSAGE } from '../../constants';

export default function JoinForm() {
  const navigate = useNavigate();

  const serverName = useRecoilValue(serverNameState);
  const setToken = useSetRecoilState(tokenState);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  const autoLogin = async () => {
    try {
      const response = await postLogin(serverName, name, password);
      const { token }: LoginResponse = await response.json();
      setToken(token);
    } catch {
      showToast('error', API_ERROR_MESSAGE.postLogin);
    } finally {
      navigate('/');
    }
  };

  const join = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await postJoin(serverName, name, password);
      if (!response.ok) {
        const body = await response.json();
        showToast('warning', body.errorMessage);
        return;
      }
    } catch {
      showToast('error', API_ERROR_MESSAGE.postJoin);
      return;
    }

    await autoLogin();
    showToast('info', API_INFO_MESSAGE.postJoin, 2000);
  };

  const validInput = name !== '' && password !== '';

  return (
    <>
      <HiddenMessage>환영합니다!</HiddenMessage>
      <Wrapper>
        <div>
          <Label>아이디</Label>
          <InputRow>
            <InputBox>
              <Input textType="string" value={name} setValue={setName} length={10} />
            </InputBox>
          </InputRow>
          <Label>비밀번호</Label>
          <InputBox>
            <Input
              textType="string"
              value={password}
              setValue={setPassword}
              length={10}
              textSecurity
            />
          </InputBox>
        </div>
        <Button type="submit" onClick={join} disabled={!validInput}>
          회원가입
        </Button>
      </Wrapper>
    </>
  );
}

const HiddenMessage = styled.p`
  z-index: 0;
  position: fixed;
  top: 240px;

  font-size: 32px;
  color: #525252;
`;

const pull = keyframes`
  from  { margin-top: 0; }
  20%   { margin-top: 0; }
  to    { margin-top: 96px; }
`;

const Wrapper = styled.form`
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 384px;
  height: 288px;
  margin-top: 96px;
  border: #d9d2e3 solid 1px;
  border-radius: 8px;
  padding: 0 24px;
  padding-bottom: 24px;

  background: #f6f8fa;

  animation: ${pull} 1s;
`;

const Label = styled.p`
  width: 100%;
  margin: 16px 0;
  padding: 0 8px;

  font-size: 16px;
  color: #525252;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: #04c09e;

  font-size: 16px;
  font-weight: 600;
  color: white;

  &:disabled {
    background: #a7efe1;
  }
`;
