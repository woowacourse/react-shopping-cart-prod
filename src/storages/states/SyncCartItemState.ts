import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../../types/CartItem';
import type { Product } from '../../types/Product';
import { SyncState } from './SyncState';

type ClientState = CartItem | null;

type RemoteState = CartItemEntity | null;

class SyncCartItemState extends SyncState<Client, ClientState, RemoteState> {
  readonly productId: Product['id'];

  constructor(
    productId: Product['id'],
    client: Client,
    clientState: ClientState,
    remoteState: RemoteState,
  ) {
    super(client, clientState, remoteState);
    this.productId = productId;
  }

  override stateEquals(clientState: ClientState, remoteState: RemoteState): boolean {
    return (
      clientState?.checked === remoteState?.checked &&
      clientState?.quantity === remoteState?.quantity
    );
  }

  override syncToRemote(): Promise<RemoteState> | null {
    // sync: delete
    // 최종적으로 설정될 상태가 null(삭제됨)이라면, 삭제 쿼리를 보냅니다.
    if (this.clientState === null) {
      if (this.remoteState !== null) {
        return this.client
          .delete(this.client.path('/cart-items/:cartItemId', this.remoteState.id))
          .then((response) => response.acceptOrThrow(204))
          .then(() => null);
      }
      return null;
    }

    // sync: create
    // id가 존재하지 않는다면 생성하는 쿼리를 보냅니다.
    const { product } = this.clientState;
    if (this.remoteState === null) {
      // id가 없어 lastState를 업데이트할 수 없기 때문에, 우선은 생성을 먼저 하고 나중에 lastState로 설정
      return this.client
        .post('/cart-items', { productId: product.id })
        .then((response) => response.acceptOrThrow(201))
        .then((response) => {
          // 변경한 상태가 없었다면 원래 설정하려고 했던 상태로 설정
          // if (!this.hasDirtyUpdate()) this.set(lastState);

          const id = Number(response.headers.location.split('/').pop());
          return { id, product, ...response.data };
        });
    }

    // sync: optimize update
    // remote와 동일한 값이라면 업데이트할 필요가 없습니다.
    if (
      this.remoteState.checked === this.clientState.checked &&
      this.remoteState.quantity === this.clientState.quantity
    ) {
      return null;
    }

    // sync: update
    // 삭제 혹은 생성이 아닐 경우 값을 업데이트하는 쿼리를 보냅니다.
    const { id } = this.remoteState;
    return this.client
      .patch(this.client.path('/cart-items/:cartItemId', id), {
        quantity: this.clientState.quantity,
        checked: this.clientState.checked,
      })
      .then((response) => response.acceptOrThrow(200))
      .then((response) => ({ id, product, ...response.data }));
  }
}

export default SyncCartItemState;
