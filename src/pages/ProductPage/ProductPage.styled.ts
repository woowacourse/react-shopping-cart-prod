import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 400px;

  margin: 40px auto;

  h2 {
    line-height: 30px;

    font-size: 20px;
    font-weight: 600;
  }

  hr {
    width: 100%;
  }

  dl {
    display: flex;
    justify-content: space-between;

    width: 100%;

    font-size: 15px;
  }

  dt {
    width: 100px;
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;

  aspect-ratio: 1 / 1;

  img {
    width: 100%;
  }
`;

const Message = styled.div`
  font-size: 25px;
`;

export { Page, ImageContainer, Message };
