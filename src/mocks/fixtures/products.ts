import type { ProductEntity } from '../../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../../api/utils/http';
import { BASE_URL } from '../../config/environment';

const products: ProductEntity[] = [
  {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: joinPath(BASE_URL, '/images/products/1.png'),
  },
  {
    id: 2,
    name: 'PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: joinPath(BASE_URL, '/images/products/2.png'),
  },
  {
    id: 3,
    name: 'PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: joinPath(BASE_URL, '/images/products/3.png'),
  },
  {
    id: 4,
    name: 'PET보틀-납작(450ml)',
    price: 10000,
    imageUrl: joinPath(BASE_URL, '/images/products/4.png'),
  },
  {
    id: 5,
    name: 'PET보틀-단지(480ml)',
    price: 41000,
    imageUrl: joinPath(BASE_URL, '/images/products/5.png'),
  },
  {
    id: 6,
    name: 'PET보틀-납작(260ml)',
    price: 61800,
    imageUrl: joinPath(BASE_URL, '/images/products/6.png'),
  },
  {
    id: 7,
    name: 'PET보틀-원형(500ml)',
    price: 42200,
    imageUrl: joinPath(BASE_URL, '/images/products/7.png'),
  },
  {
    id: 8,
    name: 'PET보틀-원형(600ml)',
    price: 44500,
    imageUrl: joinPath(BASE_URL, '/images/products/8.png'),
  },
  {
    id: 9,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: joinPath(BASE_URL, '/images/products/9.png'),
  },
  {
    id: 10,
    name: 'PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: joinPath(BASE_URL, '/images/products/10.png'),
  },
  {
    id: 11,
    name: 'PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: joinPath(BASE_URL, '/images/products/11.png'),
  },
  {
    id: 12,
    name: 'PET보틀-납작(450ml)',
    price: 39900,
    imageUrl: joinPath(BASE_URL, '/images/products/12.png'),
  },
];

export default products;
