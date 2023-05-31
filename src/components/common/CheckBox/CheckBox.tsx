import { styled } from 'styled-components';
import UncheckedImage from '../../../assets/icon/unchecked-icon.svg';
import CheckedImage from '../../../assets/icon/checked-icon.svg';

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1px solid #dddddd;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-image: url(${UncheckedImage});
  background-size: cover;

  &:checked {
    border: 1px solid var(--main-bg-color);
    background-color: var(--main-bg-color);
    background-image: url(${CheckedImage});
    background-size: cover;
  }
`;

export default CheckBox;
