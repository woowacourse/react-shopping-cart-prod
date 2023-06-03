/* eslint-disable no-await-in-loop */
import type { Client } from '../api';
import type { CartItemEntity } from '../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../types/CartItem';
import SyncCartItemState from './states/SyncCartItemState';

const DEFAULT_SYNC_INTERVAL = 30_000;

type ChangeByDownstreamHandler = (updater: (cartItems: CartItem[]) => CartItem[]) => void;

type SyncHandler = (
  info: { isSynchronizing: true } | { cartItems: CartItemEntity[]; isSynchronizing: false },
) => void;

type SyncCartItemsStorageOptions = {
  /**
   * remote로 부터 데이터를 받아 동기화하는 간격을 설정합니다. 단위: ms
   */
  syncInterval: number;
};

class SyncCartItemsStorage {
  protected readonly options: SyncCartItemsStorageOptions;

  protected readonly client: Client;

  protected readonly syncStates: Map<CartItem['product']['id'], SyncCartItemState> = new Map();

  protected syncIntervalHandler: NodeJS.Timer;

  protected changeByDownstreamHandler: ChangeByDownstreamHandler | null = null;

  protected syncHandler: SyncHandler | null = null;

  protected sync: Promise<CartItemEntity[]> | null = null;

  constructor(
    client: Client,
    options: SyncCartItemsStorageOptions = {
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
   * remote에서 받아온 상태를 토대로 동기화를 시작하기 위해 이 함수를 호출합니다.
   */
  setFromRemote(cartItems: CartItemEntity[]) {
    cartItems.forEach((cartItem) => {
      const state = this.createState(cartItem.product.id, cartItem, cartItem);
      state.set(cartItem); // HACK: force trigger sync
    });

    this.fireSyncEvent(cartItems);
  }

  private createState(
    productId: CartItem['product']['id'],
    clientCartItem?: CartItem,
    remoteCartItem?: CartItemEntity,
  ) {
    const state = new SyncCartItemState(
      productId,
      this.client,
      clientCartItem ?? null,
      remoteCartItem ?? null,
    );
    this.syncStates.set(productId, state);
    state.onError(() => this.doDownstreamSync());
    state.onConflict((clientCartItem, remoteCartItem) => {
      this.resolveConflict(productId, remoteCartItem);
    });
    return state;
  }

  private resolveConflict(productId: CartItem['product']['id'], expectedCartItem: CartItem | null) {
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

  /**
   * client의 상태가 변경되었을 때 remote에 상태 변경을 통보하기 위해 호출하는 함수입니다.
   */
  setFromClient(cartItems: CartItem[]) {
    this.syncStates.forEach((state, productId) => {
      const isRemoved = !cartItems.some((cartItem) => cartItem.product.id === productId);

      if (isRemoved) state.set(null);
    });

    cartItems.forEach((cartItem) => {
      const state = this.syncStates.get(cartItem.product.id);
      if (state) {
        state.set(cartItem);
        return;
      }
      const stateCreated = this.createState(cartItem.product.id);
      stateCreated.set(cartItem);
      this.syncStates.set(cartItem.product.id, stateCreated);
    });

    this.fireSyncEvent(cartItems);
  }

  /**
   * client <-> remote 간 상태 동기화가 시작되었을 때,
   * 상태 동기화가 끝난 후 {@link synchronizedHandler}를 호출합니다.
   */
  private async fireSyncEvent(cartItems: CartItem[]) {
    if (this.sync === null) {
      this.syncHandler?.({ isSynchronizing: true });
      this.sync = this.waitForSync().then(() => {
        return cartItems
          .map((cartItem) => this.syncStates.get(cartItem.product.id)?.remoteState)
          .filter((cartItem): cartItem is CartItemEntity => Boolean(cartItem));
      });
      this.sync.then((cartItems) => {
        this.syncHandler?.({ cartItems, isSynchronizing: false });
        this.sync = null;
      });
    }
  }

  reset() {
    this.syncStates.forEach((state) => {
      state.set(null);
      state.clear();
    });
    // this.states.clear();
  }

  /**
   * remote로 부터 최신 상태를 받아와 client의 상태를 동기화합니다.
   */
  async doDownstreamSync() {
    const cartItems = await this.client
      .get('/cart-items')
      .then((response) => response.acceptOrThrow(200).data);

    this.syncStates.forEach((state) =>
      state.enqueueDownstreamSync(
        cartItems.find((cartItem) => cartItem.product.id === state.productId) ?? null,
      ),
    );
    this.changeByDownstreamHandler?.(() => cartItems);
  }

  async waitForSync() {
    while ([...this.syncStates.values()].some((state) => state.isSynchronizing())) {
      await Promise.all(
        [...this.syncStates.values()]
          .filter((state) => state.isSynchronizing())
          .map((state) => state.waitForSync()),
      );
    }
  }

  clear() {
    clearInterval(this.syncIntervalHandler);
    this.syncStates.clear();
  }

  /**
   * 예외 상황의 발생으로 인해 client의 상태가 수정되어야 할 때 호출되는 핸들러입니다.
   */
  onChangeByDownstream(changeByDownstreamHandler: ChangeByDownstreamHandler | null) {
    this.changeByDownstreamHandler = changeByDownstreamHandler;
  }

  /**
   * 상태가 remote와 동기화를 시작할 때 혹은 완료되었을 때 호출됩니다.
   */
  onSync(syncHandler: SyncHandler | null) {
    this.syncHandler = syncHandler;
  }
}

export default SyncCartItemsStorage;
