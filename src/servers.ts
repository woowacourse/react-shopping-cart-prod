const SERVER_URLS: string = import.meta.env.VITE_SERVER_URLS;

const SERVER_NAMES = ['주드', '키아라', '히이로'];

export type Server = {
  name: string;
  base: string;
};

const servers: Server[] = SERVER_URLS.split(',').map((serverUrl, index) => ({
  name: SERVER_NAMES[index] ?? `서버-${index + 1}`,
  base: serverUrl,
}));

export default servers;
