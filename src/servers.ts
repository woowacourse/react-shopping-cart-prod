const servers = [
  { name: 'api-1', origin: 'http://dev.solo5star.com:9090', baseUrl: '/api-1' },
  { name: 'api-2', origin: 'http://dev.solo5star.com:9091', baseUrl: '/api-2' },
  { name: 'api-3', origin: 'http://dev.solo5star.com:9092', baseUrl: '/api-3' },
] as const satisfies readonly {
  name: string;
  origin: string;
  baseUrl: string;
}[];

export type Server = (typeof servers)[number];

export default servers;
