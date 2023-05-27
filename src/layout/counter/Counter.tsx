import styled from 'styled-components';

interface CounterProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  width?: string;
  height?: string;
}

export const Counter = ({
  quantity,
  onQuantityChange,
  width,
  height,
}: CounterProps) => {
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
    <Style.Container $width={width} $height={height}>
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

const Style = {
  Container: styled.div<{ $width?: string; $height?: string }>`
    width: ${({ $width }) => $width || '180px'};
    height: ${({ $height }) => $height || '68px'};

    display: flex;
    flex-wrap: nowrap;

    border: 1px solid lightgray;
    background: #ffffff;
    opacity: 95%;
  `,
  Input: styled.input`
    width: 23px;

    text-align: center;
    font-size: 22px;

    flex: 1;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      padding: 0;
    }
  `,
  Button: styled.button`
    all: unset;

    font-size: 14px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
    cursor: pointer;
  `,
};
