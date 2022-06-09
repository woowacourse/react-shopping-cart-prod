import styled from 'styled-components';

import { COLORS } from '../../styles/colorPalette';

function Input({ labelText, ...rest }) {
  return (
    <>
      <label>{labelText}</label>
      <StyledInput required {...rest} />
    </>
  );
}

const StyledInput = styled.input`
  width: 450px;
  height: 40px;
  margin: 4px 0 24px;
  padding-left: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid ${COLORS.DARK_GRAY};
`;

export default Input;
