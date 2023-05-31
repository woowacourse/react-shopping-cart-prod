import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import { RemoteState } from './RemoteState';

type CartItemState =
  | null
  | Pick<CartItemEntity, 'quantity' | 'checked'>
  | Pick<CartItemEntity, 'id' | 'quantity' | 'checked'>;

class RemoteCartItemState extends RemoteState<Client, CartItemState> {
  readonly productId: number;

  constructor(client: Client, productId: number, synchronizedState: CartItemState) {
    super(client, synchronizedState);
    this.productId = productId;
  }

  override stateEquals(state1: CartItemState, state2: CartItemState): boolean {
    return state1?.checked === state2?.checked && state1?.quantity === state2?.quantity;
  }

  override syncToRemote(lastState: CartItemState): Promise<CartItemState> | null {
    // sync: delete
    // 최종적으로 설정될 상태가 null(삭제됨)이라면, 삭제 쿼리를 보냅니다.
    if (lastState === null) {
      if (this.synchronizedState !== null && 'id' in this.synchronizedState) {
        return this.client
          .delete(this.client.path('/cart-items/:cartItemId', this.synchronizedState.id))
          .acceptOrThrow(204)
          .then(() => null);
      }
      return null;
    }

    // sync: create
    // id가 존재하지 않는다면 생성하는 쿼리를 보냅니다.
    if (this.synchronizedState === null || !('id' in this.synchronizedState)) {
      // id가 없어 lastState를 업데이트할 수 없기 때문에, 우선은 생성을 먼저 하고 나중에 lastState로 설정
      return this.client
        .post('/cart-items', { productId: this.productId })
        .acceptOrThrow(201)
        .then((response) => {
          // 변경한 상태가 없었다면 원래 설정하려고 했던 상태로 설정
          if (!this.hasDirtyUpdate()) this.set(lastState);

          return {
            id: Number(response.headers.location.split('/').pop()),
            ...response.data,
          };
        });
    }

    // sync: optimize update
    // remote와 동일한 값이라면 업데이트할 필요가 없습니다.
    if (
      this.synchronizedState.checked === lastState.checked &&
      this.synchronizedState.quantity === lastState.quantity
    ) {
      return null;
    }

    // sync: update
    // 삭제 혹은 생성이 아닐 경우 값을 업데이트하는 쿼리를 보냅니다.
    const { id } = this.synchronizedState;
    return this.client
      .patch(this.client.path('/cart-items/:cartItemId', id), {
        quantity: lastState.quantity,
        checked: lastState.checked,
      })
      .acceptOrThrow(200)
      .then((response) => ({ id, ...response.data }));
  }
}

export default RemoteCartItemState;
