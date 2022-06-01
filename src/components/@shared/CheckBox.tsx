import styled from 'styled-components';

type Props = {
  id: string;
  checked: boolean;
  marginBottom?: string;
  onChange: (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>,
  ) => void;
};

function CheckBox({
  id,
  checked = false,
  marginBottom = '95px',
  onChange,
}: Props) {
  return (
    <>
      <StyledInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <StyledLabel htmlFor={id} onClick={onChange} marginBottom={marginBottom}>
        <div />
      </StyledLabel>
    </>
  );
}

const StyledInput = styled.input`
  display: none;

  :checked + label {
    background: ${({ theme: { colors } }) => colors.redPink};
  }
`;

const StyledLabel = styled.label<{ marginBottom?: Props['marginBottom'] }>`
  display: inline-block;
  box-sizing: border-box;

  width: 15px;
  height: 15px;
  margin-bottom: ${({ marginBottom }) => marginBottom};

  padding: 1px;
  border: 1px solid ${({ theme: { colors } }) => colors.redPink};
  border-radius: 3px;

  background: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.white};

  cursor: pointer;

  div {
    width: 8px;
    height: 5px;
    transform: rotate(-45deg);
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.white};
    border-left: 2px solid ${({ theme: { colors } }) => colors.white};
  }
`;

export default CheckBox;
