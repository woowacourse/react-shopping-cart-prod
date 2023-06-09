import styled, { css } from 'styled-components';

const ItemContainer = styled.li`
  width: 200px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    width: 150px;
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing2};

  @media screen and (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.color.gray2};
`;

const ItemButtonWrapper = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacer.spacing2};
  right: ${({ theme }) => theme.spacer.spacing2};
  width: fit-content;
  min-width: 40px;
  max-width: calc(100% - ${({ theme }) => theme.spacer.spacing3});
  min-height: 40px;
  height: fit-content;
  margin: 0;
  padding: 2px;

  & > * {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px;
    transition: all 0.1s ease-in;
  }

  & > .stepper-button {
    border-color: ${({ theme }) => theme.color.white};
  }
`;

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.primary};
  font-size: 18px;
  font-weight: normal;
  white-space: normal;
  word-wrap: break-word;
  border-radius: 45px;

  & > svg path {
    stroke: ${({ theme }) => theme.color.primary};
    stroke-width: 1.75;
  }
`;

const nameStyle = css`
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  &.skeleton {
    height: 28px;
  }
`;

export { ItemContainer, ItemImageContainer, ItemImage, ItemButtonWrapper, buttonStyle, nameStyle };
