import { cart } from './cart';
import { members } from './members';
import { orders } from './orders';
import { product } from './product';

const handler = [...cart, ...product, ...members, ...orders];

export default handler;
