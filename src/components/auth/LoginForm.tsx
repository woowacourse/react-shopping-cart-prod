import type { LoginResponseType } from '../../types';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Input from '../common/Input';
import InputBox from '../common/InputBox';

import { tokenState, serverNameState } from '../../recoil/state';
import useToast from '../../hooks/useToast';
import api from '../../api';
import { API_ERROR_MESSAGE } from '../../constants';

export default function LoginForm() {
  const navigate = useNavigate();

  const serverName = useRecoilValue(serverNameState);
  const setToken = useSetRecoilState(tokenState);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.postLogin(serverName, name, password);
      if (!response.ok) {
        const body = await response.json();
        showToast('warning', body.errorMessage);
        return;
      }

      const { token }: LoginResponseType = await response.json();
      setToken(token);
      navigate('/');
    } catch (e) {
      showToast('warning', API_ERROR_MESSAGE.postLogin);
    }
  };

  const validInput = name !== '' && password !== '';

  return (
    <>
      <LoginFormWrapper>
        <div>
          <Label>아이디</Label>
          <InputBox>
            <Input textType="string" value={name} setValue={setName} length={10} />
          </InputBox>
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
        <Button type="submit" onClick={login} disabled={!validInput}>
          로그인
        </Button>
      </LoginFormWrapper>
      <SubBox>
        처음이신가요? <Link to="/auth/join">개인정보 없이 가입하기</Link>
      </SubBox>
    </>
  );
}

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 384px;
  height: 288px;
  border: #d0d8e0 solid 1px;
  border-radius: 8px;
  padding: 0 24px;
  padding-bottom: 24px;

  background: #f6f8fa;

  color: #525252;
`;

const Label = styled.p`
  width: 100%;
  margin: 16px 0;
  padding: 0 8px;

  font-size: 16px;
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

    cursor: default;
  }
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: 384px;
  height: 72px;
  margin-top: 32px;
  border: #d0d8e0 solid 1px;
  border-radius: 8px;
  padding: 0;
  background: transparent;

  color: #525252;

  & > a {
    color: #2b69d3;
  }
`;
