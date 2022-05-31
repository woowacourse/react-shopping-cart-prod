import styled from '@emotion/styled';
import { refresh } from 'styles/animation';
import { GRADIENT } from 'styles/theme';

const ImageWrapper = styled.div`
  cursor: wait;
  position: relative;
  width: 100%;
  overflow: hidden;
  background-image: ${GRADIENT.GRAY};
  animation: ${refresh} 2s ease infinite;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const Info = styled.div`
  cursor: wait;
  width: 100%;
  padding: 0.6rem 0;
`;

const SingleLineText = styled.p`
  width: ${(props) => props.width || '100%'};
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  background-image: ${GRADIENT.GRAY};
  animation: ${refresh} 2s ease infinite;
`;

export { ImageWrapper, Info, SingleLineText };
