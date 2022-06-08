import { Contents } from 'components/common/Snackbar';

export enum SnackbarActionType {
  OPEN_SNACKBAR = 'OPEN_SNACKBAR',
  CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
}

interface OpenSnackbarAction {
  type: SnackbarActionType.OPEN_SNACKBAR;
  payload: { type: keyof typeof Contents; value: any };
}

interface CloseSnackbarAction {
  type: SnackbarActionType.CLOSE_SNACKBAR;
}

export type SnackbarAction = OpenSnackbarAction | CloseSnackbarAction;
