import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import { RemoteState } from './RemoteState';

type CartItemState = null | Omit<CartItemEntity, 'id'> | CartItemEntity;

class CartItemRemoteState extends RemoteState<Client, CartItemState> {
  readonly productId: number;

  constructor(client: Client, state: CartItemState, productId: number) {
    super(client, state);
    this.productId = productId;
  }

  override syncToRemote(lastState: CartItemState): Promise<unknown> | null {
    // sync: delete
    if (lastState === null) {
      if (this.synchronizedState !== null && 'id' in this.synchronizedState) {
        return this.client
          .delete(this.client.path('/cart-items/:cartItemId', this.synchronizedState.id))
          .acceptOrThrow(204);
      }
      return null;
    }

    // sync: create
    if (this.synchronizedState === null || !('id' in this.synchronizedState)) {
      return this.client.post('/cart-items', { productId: this.productId }).acceptOrThrow(201);
    }

    // sync: update
    return this.client
      .patch(this.client.path('/cart-items/:cartItemId', this.synchronizedState.id), {
        quantity: lastState.quantity,
        checked: lastState.checked,
      })
      .acceptOrThrow(200);
  }
}

export default CartItemRemoteState;
