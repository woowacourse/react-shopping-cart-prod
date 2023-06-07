import { Order, OrderItem } from './order';
import { CurrentPoints, SavedPoints } from './points';
import type { Product, CartItem } from './product';

const isKeyOf = <T extends Record<string, unknown>>(
  obj: T,
  key: string | number | symbol,
): key is keyof T => key in obj;

const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null;
};

const isProduct = (value: unknown): value is Product => {
  if (!isObject(value)) {
    return false;
  }

  return (
    'id' in value &&
    'name' in value &&
    'price' in value &&
    'imageUrl' in value &&
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.price === 'number' &&
    typeof value.imageUrl === 'string'
  );
};

const isProducts = (value: unknown): value is Product[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((currentValue) => isProduct(currentValue));
};

const isCartItem = (value: unknown): value is CartItem => {
  if (!isObject(value)) {
    return false;
  }

  return (
    'id' in value &&
    'quantity' in value &&
    'product' in value &&
    typeof value.id === 'number' &&
    typeof value.quantity === 'number' &&
    isProduct(value.product)
  );
};

const isCartItems = (value: unknown): value is CartItem[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((currentValue) => isCartItem(currentValue));
};

const isOrderItem = (value: unknown): value is OrderItem => {
  if (!isObject(value)) {
    return false;
  }

  return (
    'id' in value &&
    'quantity' in value &&
    'price' in value &&
    'name' in value &&
    'imageUrl' in value &&
    typeof value.id === 'number' &&
    typeof value.quantity === 'number' &&
    typeof value.price === 'number' &&
    typeof value.name === 'string' &&
    typeof value.imageUrl === 'string'
  );
};

const isOrderItems = (value: unknown): value is OrderItem[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((currentValue) => isOrderItem(currentValue));
};

const isOrder = (value: unknown): value is Order => {
  if (!isObject(value)) {
    return false;
  }

  return (
    'id' in value &&
    'price' in value &&
    'orderDate' in value &&
    'orders' in value &&
    typeof value.id === 'number' &&
    typeof value.price === 'number' &&
    typeof value.orderDate === 'string' &&
    isOrderItems(value.orders)
  );
};

const isOrders = (value: unknown): value is Order[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((currentValue) => isOrder(currentValue));
};

const isCurrentPoints = (value: unknown): value is CurrentPoints => {
  if (!isObject(value)) {
    return false;
  }

  return 'points' in value && typeof value.points === 'number';
};

const isSavedPoints = (value: unknown): value is SavedPoints => {
  if (!isObject(value)) {
    return false;
  }

  return 'points_saved' in value && typeof value.points_saved === 'number';
};

export {
  isKeyOf,
  isProducts,
  isCartItems,
  isOrder,
  isOrders,
  isCurrentPoints,
  isSavedPoints,
};
