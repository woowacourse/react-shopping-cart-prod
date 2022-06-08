import { API_URL, setAPIURL } from '@/api/constants';
import { deleteCookie } from '@/api/cookie';
import Modal from '@/components/common/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { Position } from '@/styles/GlobalStyles';
import { useState } from 'react';
import * as Styled from './SelectServer.style';

const serverList = [
  { name: '오리 🐥', API_URL: 'http://54.180.159.79:8080/api', backgroundColor: 'yellow' },
  { name: '짱구 👻', API_URL: 'http://3.34.183.107:8080/api', backgroundColor: 'skyblue' },
  { name: '써머 🩳', API_URL: 'http://13.125.134.114:8080/api', backgroundColor: 'blue' },
  { name: '애쉬 🌪', API_URL: 'http://15.164.222.103:8080/api', backgroundColor: 'red' },
];

const serverName = (
  serverList.find(({ API_URL: server_API_URL }) => server_API_URL === API_URL) as any
).name;

function SelectServer() {
  const [currentServerName, setCurrentServerName] = useState(serverName);

  const { isShowModal, closeModal, openModal } = useModal();

  const onClickServerSelectBox = () => {
    openModal();
  };

  const onClickOption = (name, API_URL) => {
    closeModal();

    deleteCookie('access-token');

    setAPIURL(API_URL);
    setCurrentServerName(name);

    alert('인증 정보가 사라집니다. 로그인 다시 하세요 👻');

    window.location.reload();
  };

  return (
    <Position position="fixed" right="10px" bottom="10px">
      <Styled.Container>
        {!isShowModal && (
          <Styled.Box onClick={onClickServerSelectBox}>{currentServerName}</Styled.Box>
        )}

        {isShowModal && (
          <Modal closeModal={closeModal}>
            <Styled.OptionWrapper>
              {serverList.map(({ name, API_URL, backgroundColor }) => (
                <Styled.Option
                  key={name}
                  onClick={() => onClickOption(name, API_URL)}
                  backgroundColor={backgroundColor}
                >
                  {name}
                </Styled.Option>
              ))}
            </Styled.OptionWrapper>
          </Modal>
        )}
      </Styled.Container>
    </Position>
  );
}

export default SelectServer;
