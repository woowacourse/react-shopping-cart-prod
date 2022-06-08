import styled from 'styled-components';

const CardImageOverlay = styled.div`
  position: absolute;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};

  background: rgba(0, 0, 0, 0.3);

  p {
    inset: 30px 30px 60px;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;

    line-height: 1.4rem;

    color: white;

    font-size: 13px;
    font-weight: 700;
  }

  div {
    position: absolute;

    bottom: 0px;
    right: 0px;
    padding: 10px;

    background: ${({ theme: { colors } }) => colors.black};
    color: ${({ theme: { colors } }) => colors.white};

    font-size: 16px;
  }
`;

const CardImageContainer = styled.div`
  grid-column: 1 / 5;
  grid-row: 1 / 5;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 5px;
  box-shadow: ${({ theme: { colors } }) => colors.shadow} 0px 2px 2px;

  img {
    width: 100%;
  }
`;

const CardDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  grid-column: 1 / 4;
  grid-row: 5;
  font-weight: 400;

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
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
    color: inherit;
    background: none;
    width: 30px;
    height: 27px;
  }
`;

const ProductCard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: repeat(5, 1fr);
  grid-gap: 10px;
  width: 200px;
  color: ${({ theme: { colors } }) => colors.black};

  :not(:hover) {
    ${CardImageContainer} {
      ${CardImageOverlay} {
        opacity: 0;
        transition-duration: 0.3s;
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
        opacity: 1;
        transition-duration: 0.3s;
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
  ProductCard,
  Badge,
};
