import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { SERVERS } from '../constants/url';
import { serverState } from '../recoil';
import Button from './common/Button';

const ServerSelector = () => {
  const [isClicked, setIsClicked] = useState(false);

  const [server, setServer] = useRecoilState(serverState);

  const handleSeverChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setServer(SERVERS[value]);
  };

  const serverImageList = [
    'https://avatars.githubusercontent.com/u/112045553?v=4',
    'https://avatars.githubusercontent.com/u/62413589?v=4',
    'https://avatars.githubusercontent.com/u/97426362?v=4',
  ];

  const currentServer = Object.entries(SERVERS).find(([_, value]) => value === server);

  return (
    <S.Aside onBlur={() => setIsClicked(false)} onMouseLeave={() => setIsClicked(false)}>
      {isClicked ? (
        <S.Fieldset>
          <legend>서버</legend>
          <S.Wrapper>
            {Object.keys(SERVERS).map((key, index) => (
              <>
                <label htmlFor={key}>
                  <img src={serverImageList[index]} alt={key} />
                  <span>{key}</span>
                </label>
                <input type='radio' id={key} name='서버' value={key} onChange={handleSeverChange} />
              </>
            ))}
          </S.Wrapper>
        </S.Fieldset>
      ) : (
        <Button css={buttonStyle} onClick={() => setIsClicked(true)}>
          {currentServer ? currentServer[0] : '준팍'} 서버
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
    background: #fff;
    border: 1px solid var(--gray-color-200);
    color: var(--text-color);
    cursor: pointer;
  `,

  Fieldset: styled.fieldset`
    width: 126px;
    max-width: 126px;
    margin: 12px;
    animation: show 2s forwards;

    @keyframes show {
      0% {
        width: 0;
        opacity: 0;
      }
      100% {
        width: 126px;
        opacity: 1;
      }
    }

    & label {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 0;
      font-size: 14px;
      cursor: pointer;

      & img {
        width: 50px;
        margin-right: 20px;

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
  color: #fff;
  background: var(--text-color);
  border-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export default ServerSelector;
