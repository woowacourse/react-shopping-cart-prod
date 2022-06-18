import styled from 'styled-components';

const ButtonLayout = styled.button`
  color: ${({theme}) => theme.WHITE};
  font-size: ${(props) => props.fontSize || '24px'};
  font-weight: 500;
  line-height: 12px;

  background-color: ${(props) => props.backgroundColor || 'transparent'};

  background-color: ${(props) => props.selected && props.theme.GRAY_700};

  width: ${(props) => props.width || '200px'};
  height: ${(props) => props.height || '50px'};

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  opacity: ${(props) => props.disabled && 0.2};
`;

export {ButtonLayout};
