import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import cartOrderPriceState from '../recoil/selectors/cartOrderPriceState';

const InputContainer = styled.div`
  display: flex;

  width: 180px;
  height: 30px;

  border: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const InputField = styled.input`
  width: 70%;

  padding-right: 5px;

  outline: none;
  text-align: right;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30%;

  background-color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.button}

  cursor: pointer;
`;

const Description = styled.strong`
  float: right;
  margin-top: 10px;

  ${({ theme }) => theme.fonts.button};
`;

interface PriceInputProps {
  useablePoint: number;
  handleInputField: (value: number) => void;
}

const PriceInput = (props: PriceInputProps) => {
  const { useablePoint, handleInputField } = props;
  const [inputValue, setInputValue] = useState('');
  const prices = useRecoilValue(cartOrderPriceState);

  const checkPointInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value % 10 !== 0) {
      e.target.value = `${Math.floor(+e.target.value / 10).toString()}0`;
    }

    if (+e.target.value > useablePoint) {
      e.target.value = `${Math.floor(+useablePoint / 10).toString()}0`;
    }

    if (+e.target.value > prices.total) {
      e.target.value = `${Math.floor(+prices.total / 10).toString()}0`;
    }

    setInputValue(e.target.value);
  };

  const usePoint = () => {
    handleInputField(+inputValue);
  };

  return (
    <>
      <InputContainer>
        <InputField onBlur={checkPointInput} />

        <Button onClick={usePoint}>사용하기</Button>
      </InputContainer>
      <Description>사용가능포인트 {useablePoint}원</Description>
    </>
  );
};

export default PriceInput;
