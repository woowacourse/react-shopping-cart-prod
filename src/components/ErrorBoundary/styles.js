import styled from '@emotion/styled';

import errorImage from 'assets/error_image.jpg';

const ErrorImage = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  background-image: url(${errorImage});
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
`;

export { ErrorImage };
