import Styled from 'components/CloseButton/index.style';

interface CloseButtonProps {
  handleClick: Function;
}

const CloseButton = ({ handleClick }: CloseButtonProps) => {
  return <Styled.Close onClick={handleClick} />;
};

export default CloseButton;
