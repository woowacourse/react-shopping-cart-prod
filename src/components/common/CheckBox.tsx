import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const CheckBox = ({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <>
      <StyledInput id={id} type='checkbox' checked={checked} onChange={onChange}></StyledInput>
      <StyledLabel htmlFor={id}></StyledLabel>
    </>
  );
};

const StyledInput = styled.input`
  display: none;

  &:checked + label::after {
    ${flexCenter}
    content: '✔';
    font-size: 2.5rem;

    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};

    width: 3rem;
    height: 3rem;
    position: absolute;

    left: -0.3rem;
    top: -0.3rem;
  }
`;

const StyledLabel = styled.label`
  caret-color: transparent;
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 3px solid ${theme.colors.darkgrey};
  position: relative;
`;

export default CheckBox;
