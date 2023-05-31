import { styled } from 'styled-components';
import { WIDTH } from '../../styles/mediaQuery';
import { memo } from 'react';

type SubtitleProps = {
  children: React.ReactNode;
};

const Title = ({ children }: SubtitleProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default memo(Title);

const Wrapper = styled.div`
  width: 70%;

  padding: 16px;

  text-align: center;
  font-weight: 300;
  font-size: 32px;

  border-bottom: 1px solid #333333;

  @media (max-width: ${WIDTH.LG}) {
    padding: 4px;
    font-size: 24px;
  }
`;
