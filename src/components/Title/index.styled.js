import styled from "@emotion/styled";

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
  width: 100%;

  .pageTitle {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;

    + hr {
      width: 100%;
      border: 2px solid ${({ theme }) => theme.colors.black2};
      margin-top: 20px;
    }
  }

  .listTitle {
    font-size: ${({ theme }) => theme.fontSize.s};

    + hr {
      width: 100%;
      border: 1px solid ${({ theme }) => theme.colors.gray1};
      margin-top: 16px;
    }
  }

  .detailTitle {
    font-size: ${({ theme }) => theme.fontSize.m};

    + hr {
      width: 100%;
      border: 1px solid ${({ theme }) => theme.colors.gray1};
      margin-bottom: 20px;
    }
  }
`;

export default StyledTitle;
