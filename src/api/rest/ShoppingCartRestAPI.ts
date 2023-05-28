import type { HttpErrorResponse, HttpRequest, HttpResponse } from './RestAPI';

export type ProfileEntity = {
  points: number;
};

export type ProductEntity = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItemEntity = {
  id: number;
  quantity: number;
  checked: boolean;
  product: ProductEntity;
};

export type CartPointsEntity = {
  savingRate: number;
  points: number;
};

export type OrderCartItemEntity = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type OrderEntity = {
  id: number;
  savingRate: number;
  points: number;
  cartItems: OrderCartItemEntity[];
};

export type ShoppingCartRestAPI =
  | ProfileRestAPI
  | ProductsRestAPI
  | CartItemsRestAPI
  | CartPointsRestAPI
  | OrdersRestAPI;

type ProfileRestAPI = {
  request: HttpRequest<'GET', '/profile'>;
  response: HttpResponse<200, ProfileEntity> | HttpErrorResponse<400>;
};

type ProductsRestAPI =
  | {
      request: HttpRequest<'GET', '/products'>;
      response: HttpResponse<200, ProductEntity[]>;
    }
  | {
      request: HttpRequest<'GET', '/products/:productId'>;
      response: HttpResponse<200, ProductEntity> | HttpErrorResponse<404>;
    }
  | {
      request: HttpRequest<'POST', '/products', never, Omit<ProductEntity, 'id'>>;
      response: HttpResponse<201, never, { location: string }>;
    }
  | {
      request: HttpRequest<
        'PUT',
        '/products/:productId',
        never,
        Partial<Omit<ProductEntity, 'id'>>
      >;
      response: HttpResponse<200>;
    }
  | {
      request: HttpRequest<'DELETE', '/products/:productId'>;
      response: HttpResponse<204>;
    };

type CartItemsRestAPI =
  | {
      request: HttpRequest<'GET', '/cart-items'>;
      response: HttpResponse<200, CartItemEntity[]>;
    }
  | {
      request: HttpRequest<'POST', '/cart-items', never, { productId: number }>;
      response: HttpResponse<201> | HttpErrorResponse<404> | HttpErrorResponse<409>;
    }
  | {
      request: HttpRequest<
        'PATCH',
        '/cart-items/:cartItemId',
        never,
        { quantity: number; checked: boolean }
      >;
      response: HttpResponse<200, { quantity: number; checked: boolean }> | HttpErrorResponse<400>;
    }
  | {
      request: HttpRequest<'DELETE', '/cart-items/:cartItemId'>;
      response: HttpResponse<204> | HttpErrorResponse<400>;
    };

type CartPointsRestAPI = {
  request: HttpRequest<'GET', '/cart-points'>;
  response: HttpResponse<200, CartPointsEntity>;
};

type OrdersRestAPI =
  | {
      request: HttpRequest<'GET', '/orders'>;
      response: HttpResponse<200, OrderEntity[]>;
    }
  | {
      request: HttpRequest<'GET', '/orders/:orderId'>;
      response: HttpResponse<200, OrderEntity> | HttpErrorResponse<404>;
    }
  | {
      request: HttpRequest<
        'POST',
        '/orders',
        never,
        {
          usedPoints: number;
          cartItems: Array<{ id: number; productId: number; quantity: number }>;
        }
      >;
      response:
        | HttpResponse<201, never, { location: string }>
        | HttpErrorResponse<400>
        | HttpErrorResponse<406>;
    };
