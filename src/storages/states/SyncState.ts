/* eslint-disable no-await-in-loop */
import type RestClient from '../../api/RestClient';

type BaseState = object | number | string | null | undefined;

type SetOrUpdate<State> = State | ((state: State) => State);

type ErrorHandler = () => void;

type ConflictHandler<ClientState extends BaseState, RemoteState extends BaseState> = (
  corruptedState: ClientState,
  expectedState: RemoteState,
) => void;

/**
 * client와 remote의 상태를 동기화할 때 사용하는 상태입니다.
 *
 * client side에서 상태가 자주 변경됨을 가정하고 설계하였기 때문에
 * 낙관적 업데이트(Optimistic update)에 적합합니다.
 *
 * @example
 * const client = new Client();
 * const syncState = new SyncState<Client, { count: number }>(client, { count: 1 });
 * syncState.set({ count: 2 });
 * syncState.set({ count: 3 });
 */
export abstract class SyncState<
  Client extends RestClient,
  ClientState extends BaseState,
  RemoteState extends BaseState,
> {
  readonly client: Client;

  /**
   * dirtyUpdates는 remote에 동기화해야 하는 업데이트 조각(이하 update)들입니다.
   * 예를 들어, remote의 상태가 3이고, 사용자가 count를 4, 5, 6 으로 바꾸었다면,
   * dirtyUpdates는 [4, 5, 6] 이 됩니다.
   */
  protected dirtyUpdates: SetOrUpdate<ClientState>[] = [];

  clientState: ClientState;

  /**
   * remote와 동기화 된 상태입니다. 이 상태는 remote와 동일함을 보장합니다.
   */
  remoteState: RemoteState;

  /**
   * client -> remote 로 동기화하는 비동기 작업입니다.
   */
  protected upstreamSync: Promise<RemoteState> | null = null;

  /**
   * client <- remote 로 동기화하는 비동기 작업입니다.
   */
  protected downstreamSync: Promise<RemoteState> | null = null;

  protected errorHandler: ErrorHandler | null = null;

  protected conflictHandler: ConflictHandler<ClientState, RemoteState> | null = null;

  /**
   * @param client 비동기 통신에 필요한 API Client 구현체입니다.
   * @param clientState 현재 client의 상태입니다.
   * @param remoteState 현재 remote의 상태를 주어야 합니다. 이 값을 기준으로 동기화를 시작합니다.
   */
  constructor(client: Client, clientState: ClientState, remoteState: RemoteState) {
    this.client = client;
    this.clientState = clientState;
    this.remoteState = remoteState;
  }

  /**
   * 상태 업데이트를 추가합니다. 현재 진행중인 동기화 작업이 없다면 즉시 수행됩니다.
   */
  set(state: SetOrUpdate<ClientState>) {
    this.dirtyUpdates.push(state);
    this.flushDirtyUpdates();
  }

  hasDirtyUpdate() {
    return this.dirtyUpdates.length > 0;
  }

  isSynchronizing() {
    return this.upstreamSync || this.downstreamSync;
  }

  /**
   * 동기화 작업이 모두 끝날 때 까지 대기할 수 있는 함수입니다.
   */
  async waitForSync() {
    while (this.upstreamSync || this.downstreamSync) {
      await this.upstreamSync;
      await this.downstreamSync;
    }
  }

  /**
   * remote -> client로 동기화 할 작업을 추가합니다.
   */
  enqueueDownstreamSync(sync: Promise<RemoteState> | RemoteState) {
    this.dirtyUpdates = [];

    if (sync instanceof Promise) {
      this.downstreamSync = sync;
      this.downstreamSync.then((remoteState) => {
        this.downstreamSync = null;
        this.remoteState = remoteState;
        this.flushDirtyUpdates();
      });
      return;
    }
    this.remoteState = sync;
  }

  /**
   * client -> remote로 동기화 할 작업을 추가합니다.
   *
   * {@link sync} 는 resolve된 값으로 반드시 remote에서 응답한 상태여야 합니다.
   * 만약 remote에서 받아온 상태가 client와 일치하지 않을 시
   * {@link conflictHandler} 함수를 invoke합니다.
   */
  protected enqueueUpstreamSync(sync: Promise<RemoteState>, expectedState: ClientState) {
    this.upstreamSync = sync;
    this.upstreamSync.then((synchronizedState) => {
      this.remoteState = synchronizedState;
      this.upstreamSync = null;
      if (!this.stateEquals(expectedState, this.remoteState)) {
        this.conflictHandler?.(expectedState, this.remoteState);
      }
      this.flushDirtyUpdates();
    });
  }

  /**
   * remote에 동기화해야 하는 update들을 remote에 전송합니다.
   *
   * 동기화 작업은 동시에 한 번만 수행됩니다.
   */
  flushDirtyUpdates() {
    if (!this.hasDirtyUpdate()) return; // 업데이트 할 사항이 없다면 리턴합니다.
    if (this.isSynchronizing()) return; // 이미 upstreamSync 혹은 downstreamSync가 수행중이라면 종료된 후 dirtyUpdate를 진행합니다.

    const lastClientState = (this.dirtyUpdates ?? []).reduce<ClientState>(
      (accumulatedState, update) => {
        if (typeof update === 'function') {
          return update(accumulatedState);
        }
        return update;
      },
      this.clientState,
    );
    this.dirtyUpdates = [];
    this.clientState = structuredClone(lastClientState);

    const sync = this.syncToRemote();
    if (sync === null) return;

    this.enqueueUpstreamSync(sync, lastClientState);
  }

  /**
   * 상태 동등성 비교 함수입니다.
   *
   * {@link enqueueUpstreamSync} 에서 예상했던 상태와 동일한지 확인하기 위해 사용합니다.
   */
  abstract stateEquals(clientState: ClientState, remoteState: RemoteState): boolean;

  /**
   * dirtyUpdates를 lastState로 취합한 후, 이를 client -> remote로 동기화하는
   * 작업을 수행합니다.
   *
   * 이 함수는 동기화 작업(`Promise<State>`)을 반환해야 합니다.
   * 동기화 작업이 완료되면 완료된 값이 {@link remoteState} 가 됩니다.
   *
   * 만약 아무것도 하지 않아도 된다면 `null`을 반환합니다.
   *
   * @example
   * syncToRemote(): Promise<RemoteState> | null {
   *   if (this.remoteState.count === this.clientState.count) {
   *     return null; // up to date, no-op
   *   }
   *   return this.client.post('/count', { count: lastState.count })
   *     .acceptOrThrow(200).then((response) => ({ count: response.data.count }));
   * }
   */
  abstract syncToRemote(): Promise<RemoteState> | null;

  /**
   * 동기화 중 오류가 발생했을 시의 동작을 지정합니다.
   */
  onError(errorHandler: ErrorHandler | null) {
    this.errorHandler = errorHandler;
  }

  /**
   * client -> remote로 상태를 전송하였으나 remote에서 응답한 상태가
   * client와 일치하지 않는 경우의 동작을 지정합니다.
   */
  onConflict(conflictHandler: ConflictHandler<ClientState, RemoteState> | null) {
    this.conflictHandler = conflictHandler;
  }

  clear() {
    this.errorHandler = null;
    this.conflictHandler = null;
  }
}

export default SyncState;
