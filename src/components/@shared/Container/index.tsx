import Styled from './index.style';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  width: string;
  height: string;
}

const Container = ({ children, width, height }: ContainerProps) => {
  return (
    <Styled.Container width={width} height={height}>
      <div>{children}</div>
    </Styled.Container>
  );
};

export default Container;
