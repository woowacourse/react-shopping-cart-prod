import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from 'assets/trash_can_icon.svg';

const Styled = {
  Container: styled.div`
    width: 460px;
    height: 133px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    display: flex;
    padding: 20px;
    justify-content: space-between;
  `,

  LeftSide: styled.div`
    display: flex;
    gap: 15px;
  `,

  RightSide: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: end;
    font-size: 15px;
  `,

  DeleteButton: styled(DeleteIcon)`
    cursor: pointer;
  `,

  ProductName: styled.p`
    font-weight: 400;
    font-size: 15px;
    line-height: 15px;
    letter-spacing: 0.5px;
  `,
};

export default Styled;
