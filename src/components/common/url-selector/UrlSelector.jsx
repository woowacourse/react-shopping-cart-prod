import React, { useState } from "react";
import StyledUrlSelectorContainer from "./UrlSelector.styled";
import axios from "axios";
import { URL } from "@/constants";

function UrlSelector(props) {
  const [url, setUrl] = useState(localStorage.getItem("url") || URL.베루스);

  const changeUrl = (e) => {
    const crewName = e.target.textContent;
    setUrl(URL[crewName]);
    localStorage.setItem("url", URL[crewName]);
    localStorage.setItem("crewName", crewName);
    axios.defaults.baseURL = url;
  };

  return (
    <StyledUrlSelectorContainer>
      <div>현재 URL: {localStorage.getItem("crewName") || "베루스"}</div>
      <button onClick={changeUrl}>릭</button>
      <button onClick={changeUrl}>쿤</button>
      <button onClick={changeUrl}>봄</button>
      <button onClick={changeUrl}>토닉</button>
      <button onClick={changeUrl}>베루스</button>
    </StyledUrlSelectorContainer>
  );
}

export default UrlSelector;
