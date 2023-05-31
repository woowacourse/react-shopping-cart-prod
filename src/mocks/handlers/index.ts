import { cart } from './cart';
import { members } from './members';
import { product } from './product';

const handler = [...cart, ...product, ...members];

export default handler;
