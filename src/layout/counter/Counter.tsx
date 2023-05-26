import styled from 'styled-components';

interface CounterProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const Counter = ({ quantity, onQuantityChange }: CounterProps) => {
  const handleIncrease = () => {
    const increasedValue = quantity + 1;

    onQuantityChange(increasedValue > 999 ? 999 : increasedValue);
  };

  const handleDecrease = () => {
    onQuantityChange(quantity ? quantity - 1 : quantity);
  };

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputCount = Number(e.target.value);

    if (inputCount <= 0) return onQuantityChange(1);
    if (inputCount > 999) return onQuantityChange(999);

    onQuantityChange(Number(e.target.value));
  };

  return (
    <Style.Container>
      <Style.Button onClick={handleDecrease}>➖</Style.Button>
      <Style.Input
        value={quantity ?? 1}
        onChange={handleChangeInput}
        type="number"
      />
      <Style.Button onClick={handleIncrease}>➕</Style.Button>
    </Style.Container>
  );
};

// TODO: 카운터 숫자 안보이는 오류 수정하기

const Style = {
  Container: styled.div`
    width: 120px;
    height: 35px;

    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;

    border: 1px solid lightgray;
    background-color: white;
  `,
  Input: styled.input`
    width: 23px;
    height: 35px;

    text-align: center;

    flex: 1;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      padding: 0;
    }
  `,
  Button: styled.button`
    all: unset;

    font-size: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
    cursor: pointer;
  `,
};
