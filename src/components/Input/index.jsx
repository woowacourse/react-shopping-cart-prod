import { useId } from 'react';

import * as S from './style';

const Input = ({ label, type, value, placeholder, onChange, isError }) => {
  const id = useId();

  return (
    <>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        isError={isError}
      />
    </>
  );
};

export default Input;
