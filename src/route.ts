export const ROUTE: {
  Home: string;
  ShoppingCart: string;
  OrderList: string;
  OrderDetail: string;
  ProductDetail: string;
  NotFound: string;
  SignUp: string;
  Login: string;
  Edit: string;
  Leave: string;
  EditPassword: string;
} = {
  Home: '/',
  ShoppingCart: '/shopping-cart',
  OrderList: '/order-list',
  OrderDetail: '/order-detail',
  ProductDetail: '/products/:productId',
  SignUp: '/customers/signup',
  Login: '/customers/login',
  Edit: '/customers/edit',
  Leave: '/customers/leave',
  EditPassword: '/customers/edit/password',
  NotFound: '/*',
};
