import { AxiosError } from 'axios';
import { CartListActionType } from 'redux/cartList/action';
import { Valueof } from 'types/utilities';

import { ItemActionType } from './item/action';
import { ItemListActionType } from './itemList/action';
import { PageItemListActionType } from './pageItemList/action';
import { UserThunkActionType } from './user/action';

type AllThunkAction =
  | Valueof<typeof CartListActionType>
  | Valueof<typeof ItemListActionType>
  | Valueof<typeof ItemActionType>
  | Valueof<typeof PageItemListActionType>
  | Valueof<typeof UserThunkActionType>;

export const buildThunkActionGroup = <T, A extends AllThunkAction>(actionType: A) => ({
  request: () => ({ type: `${actionType}_REQUEST` as const }),
  success: (data?: T) => ({ type: `${actionType}_SUCCESS` as const, payload: data }),
  failure: (e: AxiosError) => ({
    type: `${actionType}_FAILURE` as const,
    payload: e,
  }),
});
