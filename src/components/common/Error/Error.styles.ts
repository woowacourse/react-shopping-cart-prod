import styled, { css } from 'styled-components';

const ContentWrapper = styled.div`
  position: relative;
`;

const Content = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);

  & > * {
    text-align: center;
  }

  & > .heading {
    margin-bottom: ${({ theme }) => theme.spacer.spacing2};
    font-weight: 600;
  }

  & > label {
    margin-top: ${({ theme }) => theme.spacer.spacing3};
    width: 250px;

    & > select {
      padding: 14px;
    }
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200x;
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
`;

const textStyle = css`
  margin-bottom: ${({ theme }) => theme.spacer.spacing2};
`;

const buttonStyle = css`
  margin-top: ${({ theme }) => theme.spacer.spacing3};
  width: 250px;
`;

export { ContentWrapper, Content, Image, textStyle, buttonStyle };
