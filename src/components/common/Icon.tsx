import { CSSProp, styled } from 'styled-components';
import { IconProps } from '../../types';

const Icon = ({ css, pathFill, children, ...props }: IconProps) => {
  return (
    <StyledSvg {...props} css={css}>
      <path d={props.path} fill={pathFill} />
      {children}
    </StyledSvg>
  );
};

const StyledSvg = styled.svg<{ css?: CSSProp }>`
  ${(props) => props.css}
`;

export default Icon;
