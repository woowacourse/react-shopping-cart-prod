import styled from "@emotion/styled";

const AmountBoxWrapper = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 300px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray4}`};
  padding: 30px;

  button {
    background-color: ${({ theme }) => theme.colors.mint};
    color: white;
    font-size: ${({ theme }) => theme.fontSize.l};
    width: 350px;
    height: 80px;
  }
`;

const AmountBoxHeaderBox = styled.div`
  width: 100%;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: ${({ theme }) => `3px solid ${theme.colors.gray4}`};
`;

const PriceInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 34px 0 68px;
  & p {
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: 700;
    background-size: 0% 50%;
    background: ${({ theme }) =>
      `linear-gradient(to top, ${theme.colors.mint} 50%, transparent 50%)`};
  }
`;

export { AmountBoxWrapper, AmountBoxHeaderBox, PriceInfoContainer };
