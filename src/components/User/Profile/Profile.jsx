import * as Styled from './style';
import profileDefaultImg from 'assets/png/profileDefaultImg.png';
import PropTypes from 'prop-types';
import { showSnackBar } from 'reducers/ui/ui.actions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CONVERT_MODE = 'CONVERT_MODE';
const CONFIRM_MODE = 'CONFIRM_MODE';

const Profile = ({ name }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(CONFIRM_MODE);
  const [newName, setNewName] = useState(name);

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleClickConfirmButton = () => {
    setMode(CONVERT_MODE);
  };

  const handleClickConvertButton = () => {
    setMode(CONFIRM_MODE);

    // TODO: api 등 실패시 에러 스낵바 노출 할 것
    dispatch(
      showSnackBar({
        type: 'SUCCESS',
        text: '이름이 성공적으로 변경되었습니다!',
      }),
    );
  };

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <Styled.Wrapper>
      <Styled.Image src={profileDefaultImg} alt="프로필 사진" />
      <Styled.Info>
        <Styled.Title>회원</Styled.Title>
        <Styled.NameConverter>
          {mode === CONFIRM_MODE ? (
            <>
              <span>{newName}</span>
              <Styled.Button onClick={handleClickConfirmButton}>
                수정
              </Styled.Button>
            </>
          ) : (
            <>
              <input value={newName} onChange={handleChangeName} />
              <Styled.Button onClick={handleClickConvertButton}>
                확인
              </Styled.Button>
            </>
          )}
        </Styled.NameConverter>
      </Styled.Info>
    </Styled.Wrapper>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
};

export default Profile;
