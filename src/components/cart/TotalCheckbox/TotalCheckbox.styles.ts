import { styled } from 'styled-components';
import { CheckboxStyle } from '../../@common/Checkbox';

export const S = {
  CheckboxAllWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    gap: 10px;
    font-size: 24px;
  `,

  RemoveSelectedButton: styled.button`
    width: 100px;
    height: 35px;
    padding: 5px;
    background-color: white;
    border: 1px solid #bbb;
    border-radius: 7px;
    font-size: 16px;
  `,

  CheckboxAll: styled(CheckboxStyle)``,
};
