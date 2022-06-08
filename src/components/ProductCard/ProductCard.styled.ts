import styled from 'styled-components';

const CardImageOverlay = styled.div`
  position: absolute;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.3);

  p {
    display: -webkit-box;
    position: absolute;

    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;

    line-height: 1.4rem;

    inset: 30px 30px 60px;

    color: white;

    font-size: 13px;
    font-weight: 700;
  }

  div {
    position: absolute;
    right: 0;
    bottom: 0;

    padding: 10px;

    background: ${({ theme: { colors } }) => colors.black};
    color: ${({ theme: { colors } }) => colors.white};

    font-size: 16px;
  }
`;

const CardImageContainer = styled.div`
  grid-column: 1 / 5;
  grid-row: 1 / 5;
  position: relative;

  overflow: hidden;

  aspect-ratio: 1 / 1;
  box-shadow: ${({ theme: { colors } }) => colors.shadow} 0px 2px 2px;
  border-radius: 5px;

  img {
    width: 100%;
  }
`;

const CardDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 4;
  grid-row: 5;
  gap: 5px;

  font-weight: 400;

  h3 {
    display: -webkit-box;

    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    font-size: 13px;
  }

  p {
    font-size: 16px;
  }
`;

const CardButtonContainer = styled.div`
  grid-column: 4;
  grid-row: 5;
  display: flex;
  justify-content: center;
  align-items: center;

  color: inherit;

  button {
    width: 30px;
    height: 27px;

    background: none;
    color: inherit;
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: repeat(5, 1fr);
  grid-gap: 10px;

  width: 200px;

  color: ${({ theme: { colors } }) => colors.black};

  :not(:hover) {
    ${CardImageContainer} {
      ${CardImageOverlay} {
        transition-duration: 0.3s;
        opacity: 0;
      }

      img {
        transform: scale(1, 1);
        transition-duration: 0.3s;
      }
    }
  }

  :hover {
    ${CardImageContainer} {
      ${CardImageOverlay} {
        transition-duration: 0.3s;
        opacity: 1;
      }

      img {
        transform: scale(1.05, 1.05);
        transition-duration: 0.3s;
      }
    }

    ${CardDescriptionContainer} > h3 {
      text-decoration: underline;
    }
  }
`;

const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 35px;
  left: 25px;

  width: 15px;
  height: 15px;
  border: 0.5px solid ${({ theme: { colors } }) => colors.white};
  border-radius: 50%;

  background: ${({ theme: { colors } }) => colors.pink};
  color: ${({ theme: { colors } }) => colors.black};

  font-size: 12px;
`;

export {
  CardImageOverlay,
  CardImageContainer,
  CardDescriptionContainer,
  CardButtonContainer,
  Card,
  Badge,
};
