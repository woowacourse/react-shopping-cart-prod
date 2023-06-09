import { MockedRequest } from 'msw';
import type { ProfileEntity } from '../api/rest/ShoppingCartRestAPI';
import { MSWException } from './exceptions';
import profiles from './fixtures/profiles';

interface RequestUser {
  username: string;
  password: string;
}

declare module 'msw' {
  interface MockedRequest {
    get user(): RequestUser;

    get profile(): ProfileEntity;
  }
}

Object.defineProperty(MockedRequest.prototype, 'user', {
  get: function user(this: MockedRequest): RequestUser {
    const authorization = this.headers.get('Authorization');
    if (authorization === null) throw new MSWException(401, '로그인이 필요합니다.');

    const [authScheme, ...authParameters] = authorization.split(' ');

    if (authScheme !== 'Basic')
      throw new MSWException(406, `Unsupported auth scheme: ${authScheme}`);

    const credentials = authParameters.join(' ');
    const [username, password] = atob(credentials).split(':');

    return { username, password };
  },
});

Object.defineProperty(MockedRequest.prototype, 'profile', {
  get: function profile(this: MockedRequest): ProfileEntity {
    const { user } = this;

    const profile = profiles[`${user.username}:${user.password}`];
    if (!profile) throw new MSWException(401, '존재하지 않는 사용자입니다.');

    return profile;
  },
});
