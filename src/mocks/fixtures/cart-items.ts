import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../../api/utils/http';
import { BASE_URL } from '../../config/environment';

const cartItems: CartItemEntity[] = [
  {
    id: 1,
    quantity: 5,
    checked: true,
    product: {
      id: 2,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: joinPath(BASE_URL, '/images/products/2.png'),
    },
  },
  {
    id: 2,
    quantity: 1,
    checked: true,
    product: {
      id: 8,
      name: 'PET보틀-원형(600ml)',
      price: 44500,
      imageUrl: joinPath(BASE_URL, '/images/products/8.png'),
    },
  },
  {
    id: 3,
    quantity: 3,
    checked: false,
    product: {
      id: 10,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: joinPath(BASE_URL, '/images/products/10.png'),
    },
  },
];

export default cartItems;
