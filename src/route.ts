export const ROUTE: {
  Home: string;
  ShoppingCart: string;
  OrderList: string;
  ProductDetail: string;
  NotFound: string;
  SignUp: string;
  Login: string;
  Edit: string;
  Leave: string;
  EditPassword: string;
  OrderDetail: string;
} = {
  Home: '/',
  ShoppingCart: '/shopping-cart',
  OrderList: '/order-list',
  OrderDetail: '/order-list/:orderId',
  ProductDetail: '/products/:productId',
  SignUp: '/customers/signup',
  Login: '/customers/login',
  Edit: '/customers/edit',
  Leave: '/customers/leave',
  EditPassword: '/customers/edit/password',
  NotFound: '/*',
};

export const PAYMENTS_ROUTE = {
  CardList: 'payments',
  CardAdd: 'payments/cardlist/add',
  CardSuccess: 'payments/cardlist/add/success',
};
