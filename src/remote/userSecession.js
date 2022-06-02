import LocalStorage from "../storage/localStorage";

async function requestDeleteUser(password) {
  const accessToken = LocalStorage.getItem("accessToken");
  if (!accessToken) {
    alert("토큰이 없습니다!");
    return null;
  }
  // eslint-disable-next-line no-undef
  const url = `${API_URL}/customers/me`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
  });

  console.dir(response);

  return response.ok;
}

export default requestDeleteUser;
