import * as S from './SelectServer.styles';

const SelectServer = () => {
  const onChangeServer: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const server = e.target.value;
    //setServer(server);
  };

  return (
    <S.SelectBox onChange={onChangeServer}>
      <option value="여우">여우</option>
      <option value="제이">제이</option>
      <option value="루쿠">루쿠</option>
    </S.SelectBox>
  );
};

export default SelectServer;
