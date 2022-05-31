import styled from 'styled-components';

export default styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  padding: 80px 50px;
  border: 1px solid ${({ theme }) => theme.gray_100};

  .title {
    margin-bottom: 35px;
    font-size: 3.2rem;
    font-weight: 800;
  }

  .input-wrapper {
    width: 100%;
    margin-bottom: 15px;
  }

  .password-wrapper {
    width: 100%;
    margin-bottom: 90px;

    & input:last-child {
      margin-top: 15px;
    }
  }
`;
