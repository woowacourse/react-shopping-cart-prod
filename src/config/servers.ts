const API_URLS: string = import.meta.env.VITE_API_URLS;

export type Server = {
  name: string;
  base: string;
};

const parseAPIUrl = (apiUrl: string): Server => {
  const matches = /^(?:\[(?<name>[가-힣\w\d_-]+)\])?(?<base>https?:\/\/.+)$/.exec(apiUrl);
  if (matches === null || matches.groups === undefined)
    throw new Error(
      `"${apiUrl}"은 올바르지 않은 API_URL입니다. [name]http:// 혹은 [name]https:// 형식으로 입력해야 합니다.`,
    );

  const { name, base } = matches.groups;
  if (!base) {
    throw new Error(`"${base}"은 올바르지 않은 URL입니다.`);
  }

  return { name, base };
};

const servers: Server[] = API_URLS.split(',').map(parseAPIUrl);

export default servers;
