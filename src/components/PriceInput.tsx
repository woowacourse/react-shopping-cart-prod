import styled from 'styled-components';
import usePointInput from '../hooks/usePointInput';

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

const Button = styled.button`
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
  const { checkPointInput, inputValue } = usePointInput(useablePoint);

  const consumePoint = () => {
    handleInputField(+inputValue);
  };

  return (
    <>
      <InputContainer>
        <InputField onBlur={checkPointInput} />

        <Button onClick={consumePoint} type="button">
          사용하기
        </Button>
      </InputContainer>
      <Description>사용가능포인트 {useablePoint}원</Description>
    </>
  );
};

export default PriceInput;
