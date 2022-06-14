import styled from 'styled-components';

export default styled.form`
  position: relative;
  width: 440px;
  height: fit-content;
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

  .link-wrapper {
    width: 100%;
    text-align: right;
    margin-bottom: 15px;
  }
`;
