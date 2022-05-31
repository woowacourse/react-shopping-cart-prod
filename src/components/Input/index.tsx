import React, { ReactNode, useState, useEffect } from 'react';
import Styled from './index.style';
import { ReactComponent as CorrectIcon } from 'assets/correct_icon.svg';
import { ReactComponent as InCorrectIcon } from 'assets/incorrect_icon.svg';

interface InputProps {
  icon: ReactNode;
  label: string;
  validator?: Function;
}

const Input = ({ icon, label, validator }: InputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (!validator) {
      return;
    }

    try {
      validator(inputValue);
      setIsCorrect(true);
      setMessage(`Correct ${label.toLowerCase()}`);
    } catch (error) {
      setIsCorrect(false);
      setMessage(error.message);
    }
  }, [validator, inputValue]);

  return (
    <Styled.Container>
      <Styled.Label htmlFor={label}>{label}</Styled.Label>

      <Styled.InputContainer isFocus={validator && isFocus} isCorrect={isCorrect}>
        {icon}
        <Styled.Input
          id={label}
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </Styled.InputContainer>

      {validator && (
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
