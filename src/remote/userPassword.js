import LocalStorage from "../storage/localStorage";

async function updateUserPassword({ oldPassword, newPassword }) {
  const accessToken = LocalStorage.getItem("accessToken");
  if (!accessToken) {
    alert("토큰이 없습니다!");
    return null;
  }
  // eslint-disable-next-line no-undef
  const url = `${API_URL}/customers/me?${new URLSearchParams({
    target: "password",
  })}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });

  return response.ok;
}

export default updateUserPassword;
