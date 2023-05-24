import styled from 'styled-components';

interface CheckboxProps {
  checked?: boolean;
}

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const StyledCheckbox = styled.div<CheckboxProps>`
  display: inline-block;
  width: 28px;
  height: 28px;
  background: ${(props) => (props.checked ? 'var(--color-header)' : 'white')};
  border: ${(props) => (props.checked ? 'none' : '2px solid var(--color-header)')};
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const CheckboxLabel = styled.label`
  cursor: pointer;
`;
