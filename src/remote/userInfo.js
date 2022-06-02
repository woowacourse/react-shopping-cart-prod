async function requestUserInfo(accessToken) {
  // eslint-disable-next-line no-undef
  const response = await fetch(`${API_URL}/customers/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const body = await response.json();
  return body;
}

export default requestUserInfo;
