import { ReactNode } from 'react';
import Styled from './index.style';

interface ContainerProps {
  children: ReactNode;
  width: string;
  height: string;
}

const Container = ({ children, width, height }: ContainerProps) => {
  return (
    <Styled.Container width={width} height={height}>
      {children}
    </Styled.Container>
  );
};

export default Container;
