import SelectBox from '../Common/SelectBox';

import useServerName from '../../hooks/serverName/useServerName';

const ServerNameSelectBox = () => {
  const { serverOptions, changeServerName } = useServerName();

  return <SelectBox options={serverOptions} onChange={changeServerName} />;
};

export default ServerNameSelectBox;
