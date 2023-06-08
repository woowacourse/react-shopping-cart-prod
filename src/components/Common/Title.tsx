import styled from 'styled-components';

const Title = styled.div`
  width: 100%;
  height: 130px;
  padding: 58px 0 29px 0;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;

export default Title;
