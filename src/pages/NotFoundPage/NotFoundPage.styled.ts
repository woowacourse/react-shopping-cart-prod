import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 90vh;
  line-height: 30px;

  margin: auto;

  color: ${({ theme: { colors } }) => colors.red};

  font-size: 20px;
  font-weight: 900;
`;

const ErrorCode = styled.div`
  font-size: 30px;
`;

export { Page, ErrorCode };
