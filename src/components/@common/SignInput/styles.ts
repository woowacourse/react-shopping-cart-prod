import colors from '../../../styles/theme';
import styled from 'styled-components';

export const Styled = {
  Label: styled.label`
    display: flex;
    flex-direction: column;
    width: 80%;

    font-weight: 400;
    font-size: 2.4rem;
    line-height: 2.4rem;

    letter-spacing: 0.5px;

    gap: 0.4rem;
  `,

  Input: styled.input<any>`
    width: 100%;
    height: 6.5rem;
    font-size: 2rem;
    padding-left: 1rem;

    border-top: 0px;
    border-left: 0px;
    border-right: 0px;

    outline: none;
    border-bottom: ${props => (props.isValid ? colors.colors.primary : 'red')} 3px solid;
  `,
};
