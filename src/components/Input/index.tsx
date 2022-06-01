import { ReactNode, useState, useEffect } from 'react';
import Styled from './index.style';
import { ReactComponent as CorrectIcon } from 'assets/correct_icon.svg';
import { ReactComponent as InCorrectIcon } from 'assets/incorrect_icon.svg';

interface InputProps {
  icon: ReactNode;
  label: string;
  validator?: Function;
  inputValue: string;
  setInputValue: Function;
  type?: string;
  isCorrect?: boolean;
  setIsCorrect?: Function;
  isDisabled?: boolean;
}

enum LabelKind {
  'Email Address' = '이메일',
  'Nickname' = '닉네임',
  'Password' = '비밀번호',
}

const Input = ({
  icon,
  label,
  validator,
  inputValue,
  setInputValue,
  type,
  isCorrect,
  setIsCorrect,
  isDisabled,
}: InputProps) => {
  const [message, setMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (!validator) return;

    try {
      validator(inputValue);
      setIsCorrect(true);
      setMessage(`사용 가능한 ${LabelKind[label]}입니다.`);
    } catch (error) {
      setIsCorrect(false);
      setMessage(error.message);
    }
  }, [validator, inputValue, label, setIsCorrect]);

  return (
    <Styled.Container>
      <Styled.Label htmlFor={label}>{label}</Styled.Label>

      <Styled.InputContainer
        isFocus={validator && isFocus}
        isCorrect={isCorrect}
        disabled={isDisabled}
      >
        {icon}
        <Styled.Input
          id={label}
          type={type || 'text'}
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          disabled={isDisabled}
        />
      </Styled.InputContainer>

      {validator && inputValue && (
        <Styled.ValidationContainer>
          {isCorrect ? <CorrectIcon /> : <InCorrectIcon />}
          <Styled.Message isFocus={isFocus} isCorrect={isCorrect}>
            {message}
          </Styled.Message>
        </Styled.ValidationContainer>
      )}
    </Styled.Container>
  );
};

export default Input;
