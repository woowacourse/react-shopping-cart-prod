import RestClient from './RestClient';
import type { ShoppingCartRestAPI } from './rest/ShoppingCartRestAPI';

export class Client extends RestClient<ShoppingCartRestAPI> {}
