import { HTTPResponse } from '../apis/api.type';

export const getParsedLocation = (headers: HTTPResponse['headers']) =>
  +headers.get('Location')!.replace(`${headers.url.pathname}/`, '');
