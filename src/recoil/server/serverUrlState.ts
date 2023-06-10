import { SERVER_BY_CREW } from "@utils/serverUtils";
import { atom, useRecoilState } from "recoil";
import { ServerName } from "types/ServerType";

const serverUrlState = atom<string>({
  key: "serverState",
  default: "https://h3rb.shop",
});

export default serverUrlState;

export const useServerUrl = () => {
  const [serverUrl, setServerUrl] = useRecoilState(serverUrlState);

  const setServerUrlBy = (crew: ServerName) => {
    setServerUrl(SERVER_BY_CREW[crew]);
  };

  return {
    serverUrl,
    setServerUrlBy,
  };
};
