const serverNameList = ['누누', '체인저', '필립'] as const;

export type ServerName = (typeof serverNameList)[number];

export const isProperServerName = (target: string): target is ServerName =>
  serverNameList.includes(target as ServerName);
