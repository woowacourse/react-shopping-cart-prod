import { CREW_NAMES, SERVER_BY_CREW } from '@utils/serverUtils';

export type ServerName = keyof typeof SERVER_BY_CREW;

export const isCrewNameType = (name: string): name is ServerName => {
  return CREW_NAMES.includes(name);
};
