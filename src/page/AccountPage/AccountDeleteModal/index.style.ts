import styled from 'styled-components';

const Styled = {
  Container: styled.main``,

  Notification: styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.black_002};
    font-size: 14px;
    line-height: 20px;
  `,
};

export default Styled;
