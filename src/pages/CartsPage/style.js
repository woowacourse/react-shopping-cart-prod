import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;
  padding: 58px 5%;

  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }

  .wrapper > .left {
    width: 55%;
    padding-top: 53px;
  }

  .header {
    margin-bottom: 50px;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
  }

  .checkbox-wrapper p {
    margin-left: 10px;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black_50};
  }

  .header button {
    cursor: pointer;
    width: 117px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.gray_100};
    background-color: white;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.black_50};
  }

  .header button:hover {
    background-color: ${({ theme }) => theme.gray_100};
  }

  .wrapper > .left .title {
    margin-bottom: 16px;
    font-size: 2rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black_50};
  }

  .wrapper > .left .container {
    border-top: 4px solid ${({ theme }) => theme.gray_200};
    height: 603px;
    overflow-y: auto;
  }

  .wrapper > .right {
    width: 33%;
    padding-top: 103px;
  }
`;
