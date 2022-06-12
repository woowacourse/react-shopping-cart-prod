import styled from 'styled-components';
import { flexColumnCenter } from '../../styles/mixin';

const NotFoundContainer = styled.div`
  ${flexColumnCenter};
  margin: 200px auto;

  p {
    margin-bottom: 10px;
    font-size: 20px;
  }

  button {
    border: none;
    padding: 15px 25px;
    font-size: 15px;
    background-color: ${({ theme }) => theme.colors.GRAY_800};
    color: ${({ theme }) => theme.colors.GRAY_50};
    border-radius: 10px;
    cursor: pointer;
  }
`;

export { NotFoundContainer };
