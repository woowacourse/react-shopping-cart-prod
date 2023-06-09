const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

export const credentials = btoa(email + ':' + password);

const fetchWithHeaders = async (url: string, method: string, body?: object) => {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) throw new Error(response.status.toString());

  return response;
};

export default fetchWithHeaders;
