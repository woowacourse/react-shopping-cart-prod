import { styled } from 'styled-components';

const ServerSelector = () => {
  return (
    <S.List>
      <option value='준팍'>준팍</option>
      <option value='도이'>도이</option>
      <option value='우르'>우르</option>
    </S.List>
  );
};

const S = {
  List: styled.select`
    margin-left: auto;
    margin-right: 16px;
    padding: 6px 12px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
  `,

  Server: styled.li`
    align-self: center;
  `,
};

export default ServerSelector;
