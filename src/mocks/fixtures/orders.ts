import type { OrderEntity } from '../../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../../api/utils/http';
import { BASE_URL } from '../../config/environment';

const orders: OrderEntity[] = [
  {
    id: 1,
    points: 49830,
    savingRate: 10,
    cartItems: [
      {
        productId: 8,
        name: 'PET보틀-원형(600ml)',
        price: 44500,
        imageUrl: joinPath(BASE_URL, '/images/products/8.png'),
        quantity: 1,
      },
      {
        productId: 9,
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        imageUrl: joinPath(BASE_URL, '/images/products/9.png'),
        quantity: 2,
      },
      {
        productId: 10,
        name: 'PET보틀-밀크티(370ml)',
        price: 73400,
        imageUrl: joinPath(BASE_URL, '/images/products/10.png'),
        quantity: 5,
      },
    ],
  },
  {
    id: 2,
    points: 11970,
    savingRate: 10,
    cartItems: [
      {
        productId: 12,
        name: 'PET보틀-납작(450ml)',
        price: 39900,
        imageUrl: joinPath(BASE_URL, '/images/products/12.png'),
        quantity: 3,
      },
    ],
  },
  {
    id: 3,
    points: 4340,
    savingRate: 10,
    cartItems: [
      {
        productId: 1,
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        imageUrl: joinPath(BASE_URL, '/images/products/1.png'),
        quantity: 1,
      },
    ],
  },
];

export default orders;
