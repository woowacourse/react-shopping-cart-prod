import React from 'react';
import styled from 'styled-components';

type Align = 'left' | 'center';

interface Props {
  children: React.ReactNode;
  separator?: string;
  width?: string;
  align?: Align;
}

const InputBox = ({ children, separator, width, align }: Props) => {
  return (
    <InputsBoxWrapper width={width} align={align}>
      {React.Children.toArray(children).map((input, index) => (
        <>
          {index > 0 && <Separator>{separator}</Separator>}
          {input}
        </>
      ))}
    </InputsBoxWrapper>
  );
};

export default InputBox;

const InputsBoxWrapper = styled.div<Pick<Props, 'align' | 'width'>>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'flex-start')};
  align-items: center;
  box-sizing: border-box;

  width: ${({ width }) => width ?? '100%'};
  height: 40px;
  border: none;
  border-radius: 8px;
  padding: 0 14px;
  background: #ecebf1;

  font-size: 20px;
  color: #000000;
`;

const Separator = styled.span`
  text-align: center;

  font-size: 16px;
`;
