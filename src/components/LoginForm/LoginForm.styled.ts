import styled from 'styled-components';

const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;

  margin-top: 4px;
`;

const FindUserInfoOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme: { colors } }) => colors.gray};

  font-size: 10px;

  a:hover {
    font-weight: 900;
  }
`;

export { OptionContainer, FindUserInfoOption };
