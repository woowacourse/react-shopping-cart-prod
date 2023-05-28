import type RestClient from '../../api/RestClient';

type BaseState = object | number | string | null | undefined;

type SetOrUpdate<State> = State | ((state: State) => State);

type ErrorHandler<Client extends RestClient, State extends BaseState> = (
  remoteState: RemoteState<Client, State>,
) => void;

export abstract class RemoteState<Client extends RestClient, State extends BaseState> {
  readonly client: Client;

  /**
   * dirtyUpdates는 remote에 동기화해야 하는 업데이트 조각(이하 update)들입니다.
   * 예를 들어, remote의 상태가 3이고, 사용자가 count를 4, 5, 6 으로 바꾸었다면,
   * dirtyUpdates는 [4, 5, 6] 이 됩니다.
   */
  protected dirtyUpdates: SetOrUpdate<State>[] = [];

  /**
   * remote와 동기화 된 상태입니다. 이 상태는 remote에 저장되어 있음을 보장합니다.
   */
  protected synchronizedState: State;

  /**
   * client -> remote 로 동기화하는 비동기 작업입니다.
   */
  protected upstreamSync: Promise<unknown> | null = null;

  /**
   * client <- remote 로 동기화하는 비동기 작업입니다.
   */
  protected downstreamSync: Promise<State> | null = null;

  protected errorHandler: ErrorHandler<Client, State> | null = null;

  constructor(client: Client, initialState: State) {
    this.client = client;
    this.synchronizedState = initialState;
  }

  set(state: SetOrUpdate<State>) {
    this.dirtyUpdates?.push(state);
    this.flushDirtyUpdates();
  }

  hasDirtyUpdate() {
    return this.dirtyUpdates.length > 0;
  }

  enqueueDownstreamSync(sync: Promise<State> | State) {
    this.dirtyUpdates = [];

    if (sync instanceof Promise) {
      this.downstreamSync = sync;
      this.downstreamSync.then((state) => {
        this.downstreamSync = null;
        this.synchronizedState = state;
        this.flushDirtyUpdates();
      });
      return;
    }
    this.synchronizedState = sync;
  }

  enqueueUpstreamSync(sync: Promise<unknown>) {
    this.upstreamSync = sync;
    this.upstreamSync.then(() => {
      this.upstreamSync = null;
      this.flushDirtyUpdates();
    });
  }

  /**
   * remote에 동기화해야 하는 update들을 remote에 전송합니다.
   */
  flushDirtyUpdates() {
    if (!this.hasDirtyUpdate()) return; // 업데이트 할 사항이 없다면 리턴합니다.
    if (this.upstreamSync) return; // 이미 upstreamSync가 수행되고 있다면 리턴합니다.
    if (this.downstreamSync) return; // downstreamSync가 종료된 후 dirtyUpdate를 진행합니다.

    const lastState = (this.dirtyUpdates ?? []).reduce<State>((accumulatedState, update) => {
      if (typeof update === 'function') {
        return update(accumulatedState);
      }
      return update;
    }, this.synchronizedState);
    this.dirtyUpdates = [];

    console.log(lastState);

    const sync = this.syncToRemote(lastState);
    if (sync === null) return;

    this.enqueueUpstreamSync(sync);
  }

  /**
   * dirtyUpdates를 lastState로 취합한 후, 이를 client -> remote로 동기화하는
   * 작업을 수행합니다.
   *
   * 이 함수는 동기화 작업(`Promise`)을 반환해야 합니다. 만약 아무것도 하지 않아도
   * 된다면 `null`을 반환합니다.
   */
  abstract syncToRemote(lastState: State): Promise<unknown> | null;

  onError(errorHandler: ErrorHandler<Client, State> | null) {
    this.errorHandler = errorHandler;
  }

  clear() {
    this.errorHandler = null;
  }
}

export default RemoteState;
