import * as Styled from './style';
import profileDefaultImg from 'assets/png/profileDefaultImg.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useSnackBar from 'hooks/useSnackBar';
import useProfile from './hooks';

const CONVERT_MODE = 'CONVERT_MODE';
const CONFIRM_MODE = 'CONFIRM_MODE';

const Profile = ({ name }) => {
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();
  const { isUpdateNameSucceed, isUpdateNameError, updateName } = useProfile();

  const [mode, setMode] = useState(CONFIRM_MODE);
  const [newName, setNewName] = useState(name);

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleClickConfirmButton = () => {
    setMode(CONVERT_MODE);
  };

  const handleClickConvertButton = () => {
    updateName(newName);
  };

  useEffect(() => {
    if (isUpdateNameSucceed) {
      setMode(CONFIRM_MODE);
      showSuccessSnackBar('이름이 성공적으로 변경되었습니다!');
      return;
    }

    if (isUpdateNameError) {
      showErrorSnackBar('서버 에러가 발생했습니다');
      return;
    }
  }, [isUpdateNameSucceed, isUpdateNameError]);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <Styled.Wrapper>
      <Styled.Image src={profileDefaultImg} alt="프로필 사진" />
      <Styled.Info>
        <Styled.Title>귀하신 분</Styled.Title>
        <Styled.NameConverter>
          {mode === CONFIRM_MODE ? (
            <>
              <span>{newName}님💙</span>
              <Styled.Button onClick={handleClickConfirmButton}>
                수정
              </Styled.Button>
            </>
          ) : (
            <>
              <input value={newName} onChange={handleChangeName} type="text" />
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
