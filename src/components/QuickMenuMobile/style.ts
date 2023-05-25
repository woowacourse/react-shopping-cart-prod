import styled from 'styled-components';

export const Container = styled.div`
  display: none;

  position: fixed;

  padding: 30px;

  background-color: white;
  bottom: 0;
  left: 0;
  right: 0;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: space-around;
  }
`;

type OptionProps = {
  avatar: string;
};

export const OptionLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 86px;

  cursor: pointer;
`;

export const Option = styled.div<OptionProps>`
  width: 40px;
  height: 40px;

  background-image: url(${(props) => props.avatar});
  background-size: 50px;
  background-position: cover;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  border-radius: 50%;

  &:active {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
`;

type ServerLabelProps = {
  isSelected: boolean;
};

export const ServerLabel = styled.div<ServerLabelProps>`
  margin-top: 10px;

  font-size: 12px;

  opacity: ${(props) => (props.isSelected ? 1 : 0.6)};
  font-weight: ${(props) => props.isSelected && 600};
`;
