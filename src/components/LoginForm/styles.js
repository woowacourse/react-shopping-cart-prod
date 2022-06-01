import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SignUpLink = styled(Link)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.gray_300};

  &:hover {
    text-decoration: underline;
  }
`;

export default styled.form`
  position: relative;
  width: 440px;
  padding: 60px 50px;
  border: 1px solid ${({ theme }) => theme.gray_100};

  .title {
    text-align: center;
    margin-bottom: 35px;
    font-size: 3.2rem;
    font-weight: 800;
  }

  .input-wrapper {
    width: 100%;
    margin-bottom: 15px;
  }

  .error-wrapper {
    padding: 13px;
    margin-bottom: 15px;
    background-color: ${({ theme }) => theme.gray_50};
    border-radius: 8px;

    p {
      color: ${({ theme }) => theme.red_50};
      font-size: 1.5rem;
    }
  }

  .link-wrapper {
    width: 100%;
    text-align: right;
    margin-bottom: 15px;
  }
`;
