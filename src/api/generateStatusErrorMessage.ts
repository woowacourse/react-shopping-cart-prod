import { STATUS_ERROR_MESSAGE } from '../constants';

export const generateStatusErrorMessage = (status: string) => {
  switch (status) {
    case '400':
      return STATUS_ERROR_MESSAGE[status];
    case '401':
      return STATUS_ERROR_MESSAGE[status];
    case '403':
      return STATUS_ERROR_MESSAGE[status];
    case '404':
      return STATUS_ERROR_MESSAGE[status];
    case '500':
      return STATUS_ERROR_MESSAGE[status];
    default:
      return STATUS_ERROR_MESSAGE['default'];
  }
};
