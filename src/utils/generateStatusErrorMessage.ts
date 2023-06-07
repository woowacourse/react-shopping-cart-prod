import { ERROR_MESSAGE } from '../constants';

export const generateStatusErrorMessage = (status: string) => {
  switch (status) {
    case '400':
      return ERROR_MESSAGE[status];
    case '401':
      return ERROR_MESSAGE[status];
    case '403':
      return ERROR_MESSAGE[status];
    case '404':
      return ERROR_MESSAGE[status];
    case '500':
      return ERROR_MESSAGE[status];
    default:
      return ERROR_MESSAGE['default'];
  }
};
