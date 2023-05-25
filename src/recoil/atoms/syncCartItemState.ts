import { DefaultValue, atomFamily, selectorFamily } from 'recoil';
import type Client from '../../api/Client';
import type {
  CartItemEntity,
  ProductEntity,
  ShoppingCartRestAPI,
} from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem, Product } from '../../type';
import cartItemsQuery from '../queries/cartItemsQuery';

type SyncCartItemStateKeyEntry = Readonly<{
  client: Client<ShoppingCartRestAPI>;
  productId: Product['id'];
}>;

const syncCartItemStateKeyEntries: Array<SyncCartItemStateKeyEntry> = [];

export const syncCartItemStateKey = (
  client: Client<ShoppingCartRestAPI>,
  productId: Product['id'],
) => {
  const foundEntry =
    syncCartItemStateKeyEntries.find((it) => it.client === client && it.productId === productId) ??
    null;

  if (foundEntry == null) {
    const entry = { client, productId };
    syncCartItemStateKeyEntries.push(entry);
    return entry;
  }
  return foundEntry;
};

type SyncCartItem = {
  id: CartItemEntity['id'];
  productId: ProductEntity['id'];
  quantity: CartItem['quantity'];
};

type SyncCartItemState = {
  client: Client<ShoppingCartRestAPI>;
  semaphore: Promise<unknown> | null;
  state: Pick<SyncCartItem, 'productId'> | SyncCartItem;
  enqueuedUpdates: Array<Partial<SyncCartItem> | null>;
};

const syncCartItemState = atomFamily<SyncCartItemState, SyncCartItemStateKeyEntry>({
  key: 'syncCartItemState',
  default: selectorFamily({
    key: 'syncCartItemState/default',
    get:
      (entry) =>
      ({ get }) => {
        const { client, productId } = entry;
        const cartItemEntities = get(cartItemsQuery);

        return {
          client,
          semaphore: null,
          state: {
            productId,
            ...cartItemEntities.find((cartItemEntity) => cartItemEntity.product.id === productId),
          },
          enqueuedUpdates: [],
        };
      },
  }),
  effects: [
    ({ setSelf, onSet }) => {
      const reducer = (syncCartItem: SyncCartItemState): SyncCartItemState => {
        const { client } = syncCartItem;
        const path = client.path.bind(client);

        const deleteCartItem = (id: CartItemEntity['id']) => {
          const semaphore = client.delete(path('/cart-items/:cartItemId', id)).acceptOrThrow(204);

          semaphore.finally(() =>
            setSelf((syncCartItem) => {
              if (syncCartItem instanceof DefaultValue) return syncCartItem;

              return reducer({ ...syncCartItem, semaphore: null });
            }),
          );
          return {
            ...syncCartItem,
            state: { productId: syncCartItem.state.productId },
            semaphore,
            enqueuedUpdates: [],
          };
        };

        const createCartItem = () => {
          const semaphore = client
            .post('/cart-items', { productId: syncCartItem.state.productId })
            .acceptOrThrow(201);

          semaphore.then((response) =>
            setSelf((syncCartItem) => {
              if (syncCartItem instanceof DefaultValue) return syncCartItem;

              return reducer({
                ...syncCartItem,
                state: {
                  ...syncCartItem.state,
                  id: Number(
                    String(response.headers.location)
                      .match(/(\d+)$/)
                      ?.at(0),
                  ),
                },
                semaphore: null,
              });
            }),
          );

          return { ...syncCartItem, semaphore };
        };

        const updateCartItemQuantity = (id: CartItemEntity['id'], quantity: number) => {
          const semaphore = client
            .patch(path('/cart-items/:cartItemId', id), { quantity })
            .acceptOrThrow(200);

          semaphore.finally(() =>
            setSelf((syncCartItem) => {
              if (syncCartItem instanceof DefaultValue) return syncCartItem;

              return reducer({ ...syncCartItem, semaphore: null });
            }),
          );

          return {
            ...syncCartItem,
            semaphore,
            state: { ...syncCartItem.state, quantity },
            enqueuedUpdates: [],
          };
        };

        // is update progressing now?
        if (syncCartItem.semaphore !== null) return syncCartItem;

        // consume actions (merge into final value)
        const finalState = syncCartItem.enqueuedUpdates.reduce(
          (currentState, enqueuedUpdate) => ({ ...currentState, ...enqueuedUpdate }),
          syncCartItem.state,
        );

        // Deletion
        const shouldDelete = 'quantity' in finalState && finalState.quantity <= 0;
        if (shouldDelete) {
          if ('id' in finalState) return deleteCartItem(finalState.id);
          return syncCartItem;
        }

        // Creation: if CartItem.id not exists, create one
        if (!('quantity' in finalState)) return syncCartItem;
        const shouldCreate = !('id' in finalState);
        if (shouldCreate) {
          return createCartItem();
        }

        // Update: update quantity
        if (
          'quantity' in syncCartItem.state &&
          syncCartItem.state.quantity === finalState.quantity
        ) {
          return syncCartItem;
        }
        return updateCartItemQuantity(finalState.id, finalState.quantity);
      };

      onSet((value) => {
        const newValue = reducer(value);
        if (newValue) setSelf(newValue);
      });
    },
  ],
});

export default syncCartItemState;
