import { Fragment, ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { DEFAULT_SERVER, KEY_SERVER, SERVER_IMAGE_LIST } from '../constants';
import { SERVERS } from '../constants/url';
import { serverState } from '../recoil';
import Button from './common/Button';

const ServerSelector = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [server, setServer] = useRecoilState(serverState);

  const handleSeverChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(KEY_SERVER, SERVERS[value]);
    setServer(SERVERS[value]);
    setIsClicked(false);
  };

  const serverList = Object.entries(SERVERS);
  const currentServer = serverList.find(([_, value]) => value === server);

  return (
    <S.Aside onBlur={() => setIsClicked(false)} onMouseLeave={() => setIsClicked(false)}>
      {isClicked ? (
        <S.Fieldset>
          <legend>서버</legend>
          <S.Wrapper>
            {serverList.map(([key], index) => (
              <Fragment key={key}>
                <label htmlFor={key}>
                  <img src={SERVER_IMAGE_LIST[index]} alt={key} />
                  <span>{key}</span>
                </label>
                <input type='radio' id={key} name='server' value={key} onChange={handleSeverChange} />
              </Fragment>
            ))}
          </S.Wrapper>
        </S.Fieldset>
      ) : (
        <Button css={buttonStyle} onClick={() => setIsClicked(true)}>
          {currentServer ? currentServer[0] : DEFAULT_SERVER} 서버
        </Button>
      )}
    </S.Aside>
  );
};

const S = {
  Aside: styled.aside`
    position: fixed;
    top: 168px;
    right: 0;
    z-index: 99;
    border-radius: 8px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: var(--white-color);
    border: 1px solid var(--gray-color-200);
    color: var(--text-color);
    cursor: pointer;
  `,

  Fieldset: styled.fieldset`
    width: 124px;
    max-width: 124px;
    margin: 12px;
    animation: show 1.4s forwards;

    @keyframes show {
      0% {
        width: 0;
        opacity: 0;
      }
      100% {
        width: 124px;
        opacity: 1;
      }
    }

    & label {
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 14px;
      cursor: pointer;

      & img {
        width: 50px;
        margin-right: 24px;

        &:hover {
          transform: scale(1.02);
        }
      }

      & span {
        &:hover {
          font-weight: 700;
        }
      }
    }

    & legend {
      font-weight: 700;
      text-align: center;
      padding: 2px 0 12px;
    }
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;

    & input {
      display: none;
      margin-right: 8px;
      padding-top: 4px;
    }
  `,
};

const buttonStyle = css`
  padding: 12px 16px 12px 20px;
  font-size: 14px;
  color: var(--white-color);
  background: var(--text-color);
  border-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export default ServerSelector;
