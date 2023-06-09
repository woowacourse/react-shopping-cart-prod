import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import {
  KEY_LOCALSTORAGE_SERVER_OWNER,
  DEFAULT_VALUE_SERVER_OWNER,
  SERVERS,
} from "../constants";
import { useLocalProducts } from "../hooks/useLocalProducts";
import { useToast } from "../hooks/useToast";
import { ROUTER_PATH } from "../router";
import { getLocalStorage, setLocalStorage } from "../utils";

export const ServerSelectBox = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { updateLocalProducts } = useLocalProducts();
  const [serverOwner, setServerOwner] = useState(
    getLocalStorage(KEY_LOCALSTORAGE_SERVER_OWNER, DEFAULT_VALUE_SERVER_OWNER)
  );

  const handleServerSelected = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setServerOwner(e.target.value);
    setLocalStorage(KEY_LOCALSTORAGE_SERVER_OWNER, e.target.value);
    await updateLocalProducts();

    navigate(ROUTER_PATH.Main);
    showToast("success", `${e.target.value}의 서버로 변경되었습니다. ✅`);
  };

  return (
    <SelectBox value={serverOwner} onChange={handleServerSelected}>
      {Object.keys(SERVERS).map((server) => (
        <option key={crypto.randomUUID()}>{server}</option>
      ))}
    </SelectBox>
  );
};

const SelectBox = styled.select`
  width: 65px;
  height: 40px;

  padding: 0 5px;
  margin-right: 5px;
  border-radius: 4px;
  background: var(--light-gray);

  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 850px) {
    width: 70px;
    height: 37px;
  }
`;
