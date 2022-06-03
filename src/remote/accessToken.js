async function requestAccessToken(email, password) {
  // eslint-disable-next-line no-undef
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const body = await response.json();

  if (!body.accessToken) {
    return null;
  }

  const { accessToken } = body;
  return accessToken;
}

export default requestAccessToken;
