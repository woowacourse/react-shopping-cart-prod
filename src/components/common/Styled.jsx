import styled from 'styled-components';

const SIZE_MAP = {
  large: 430,
  middle: 250,
};

const StyledImageBox = styled.div`
  width: ${(props) => `${SIZE_MAP[props.width]}`}px;
  height: ${(props) => `${SIZE_MAP[props.height]}`}px;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: ${(props) => `${SIZE_MAP[props.width]}`}px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledCheckbox = styled.input`
  appearance: none;
  border: 1px solid ${(props) => props.theme.main.PRIMARY};
  border-radius: 2px;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:checked {
    background-color: ${(props) => props.theme.main.PRIMARY};
  }
  &::after {
    content: '✔';
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: ${(props) => props.theme.main.WHITE};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  padding: 44px 80px;
  margin: 0px auto 100px;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledUserForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export { StyledImageBox, StyledImg, StyledCheckbox, StyledUserContainer, StyledUserForm };
