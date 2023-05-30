import type { Client } from '../api';
import type { CartItemEntity } from '../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../types/CartItem';
import RemoteCartItemState from './states/RemoteCartItemState';

const DEFAULT_SYNC_INTERVAL = 30_000;

type ChangeByDownstreamHandler = (
  updater: (cartItems: (CartItem | CartItemEntity)[]) => (CartItem | CartItemEntity)[],
) => void;

type RemoteCartItemsStorageOptions = {
  /**
   * remote로 부터 데이터를 받아 동기화하는 간격을 설정합니다. 단위: ms
   */
  syncInterval: number;
};

class RemoteCartItemsStorage {
  protected readonly options: RemoteCartItemsStorageOptions;

  protected readonly client: Client;

  protected readonly states: Map<CartItem['product']['id'], RemoteCartItemState> = new Map();

  protected syncIntervalHandler: NodeJS.Timer;

  protected changeByDownstreamHandler: ChangeByDownstreamHandler | null = null;

  constructor(
    client: Client,
    options: RemoteCartItemsStorageOptions = {
      syncInterval: DEFAULT_SYNC_INTERVAL,
    },
  ) {
    this.options = options;
    this.client = client;

    this.syncIntervalHandler = setInterval(
      () => this.doDownstreamSync(),
      this.options.syncInterval,
    );
  }

  /**
   * 초기에 remote의 상태를 설정합니다.
   */
  initSet(initialCartItems: (CartItem | CartItemEntity)[]) {
    initialCartItems.forEach((cartItem) => {
      const state = this.createState(cartItem.product.id, cartItem);
      state.set(cartItem); // HACK: force trigger sync
    });
  }

  createState(
    productId: CartItem['product']['id'],
    synchronizedCartItem?: CartItem | CartItemEntity,
  ) {
    const state = new RemoteCartItemState(this.client, productId, synchronizedCartItem ?? null);
    this.states.set(state.productId, state);
    state.onError(() => this.doDownstreamSync());
    state.onCorruptWhileUpstreamSync((expectedCartItem) => {
      this.correctToExpectedState(state.productId, expectedCartItem);
    });
    return state;
  }

  correctToExpectedState(
    productId: CartItem['product']['id'],
    expectedCartItem: Partial<CartItem> | null,
  ) {
    this.changeByDownstreamHandler?.((cartItems) => {
      // correction: deleted
      if (expectedCartItem === null) {
        return cartItems.filter((cartItem) => cartItem.product.id !== productId);
      }

      // correction: different value
      return cartItems.map((cartItem) => {
        if (cartItem.product.id !== productId) return cartItem;

        return { ...cartItem, expectedCartItem };
      });
    });
  }

  set(cartItems: CartItem[]) {
    this.states.forEach((state, productId) => {
      const isRemoved = !cartItems.some((cartItem) => cartItem.product.id === productId);

      if (isRemoved) state.set(null);
    });

    cartItems.forEach((cartItem) => {
      const state = this.states.get(cartItem.product.id);
      if (state) {
        state.set(cartItem);
        return;
      }
      const stateCreated = this.createState(cartItem.product.id);
      stateCreated.set(cartItem);
      this.states.set(stateCreated.productId, stateCreated);
    });
  }

  reset() {
    this.states.forEach((state) => {
      state.set(null);
      state.clear();
    });
    // this.states.clear();
  }

  /**
   * remote로 부터 최신 상태를 받아와 client의 상태를 동기화합니다.
   */
  async doDownstreamSync() {
    const { data: cartItems } = await this.client.get('/cart-items').acceptOrThrow(200);
    this.states.forEach((state) =>
      state.enqueueDownstreamSync(
        cartItems.find((cartItem) => cartItem.product.id === state.productId) ?? null,
      ),
    );
    this.changeByDownstreamHandler?.(() => cartItems);
  }

  clear() {
    clearInterval(this.syncIntervalHandler);
    this.states.clear();
  }

  /**
   * 예외 상황의 발생으로 인해 client의 상태가 수정되어야 할 때 호출되는 핸들러입니다.
   */
  onChangeByDownstream(changeByDownstreamHandler: ChangeByDownstreamHandler | null) {
    this.changeByDownstreamHandler = changeByDownstreamHandler;
  }
}

export default RemoteCartItemsStorage;
