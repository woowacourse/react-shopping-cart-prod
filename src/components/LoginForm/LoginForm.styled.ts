import styled from 'styled-components';

const LoginHelper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
  width: 100%;
`;

const FindLoginInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme: { colors } }) => colors.gray};

  font-size: 10px;

  a:hover {
    font-weight: 900;
  }
`;

export { LoginHelper, FindLoginInfo };
