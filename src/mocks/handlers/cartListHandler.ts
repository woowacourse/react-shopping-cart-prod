import { LOCAL_BASE_URL } from 'apis';
import { rest } from 'msw';
import { CartItem, UserInfo } from 'types/domain';
import {
  getLocalStorageCartList,
  getLocalStorageUserList,
  setLocalStorageCartList,
} from 'utils/localStorage';

interface MockCart {
  userEmail: string;
  list: CartItem[];
}

//let mockCartLists: MockCart[] = getLocalStorageCartList();
//let mockUserList: UserInfo[] = getLocalStorageUserList();

export const cartListHandler = [
  rest.get(`${LOCAL_BASE_URL}/cart`, (req, res, ctx) => {
    const token = req.headers.get('Authorization');

    if (token === 'null') {
      return res(ctx.status(200), ctx.json([]));
    }
    /*
    mockCartLists = getLocalStorageCartList();
    mockUserList = getLocalStorageUserList();

    const token = req.headers.get('Authorization');

    if (token === 'null') {
      return res(ctx.status(200), ctx.json([]));
    }

    const targetUser = mockUserList.find(user => user.token === token);
    const targetCart = mockCartLists.find(cartList => cartList.userEmail === targetUser.email) || {
      userEmail: '',
      list: [],
    };

    console.log(targetCart.list, 'get');

    return res(ctx.status(200), ctx.json(targetCart.list));*/

    return res(ctx.status(200), ctx.json([]));
  }),

  rest.post(`${LOCAL_BASE_URL}/cart`, (req, res, ctx) => {
    /*
    let mockCartLists: MockCart[] = getLocalStorageCartList();
    const mockUserList: UserInfo[] = getLocalStorageUserList();

    const token = req.headers.get('Authorization');

    if (token === 'null') {
      return res(ctx.status(200));
    }

    const targetUser = mockUserList.find(user => user.token === token);
    const targetCart = mockCartLists.find(cartList => cartList.userEmail === targetUser.email);
    const cartItem: CartItem = Object(req.body);

    //신규유저일때
    if (!targetCart) {
      const newCart = {
        userEmail: targetUser.email,
        list: [cartItem],
      };

      mockCartLists = [...mockCartLists, newCart];

      setLocalStorageCartList(mockCartLists);

      return res(ctx.status(200));
    }

    //item이 이미 있을 때
    const isPutReq = targetCart.list.some(item => item.id === cartItem.id);

    if (isPutReq) {
      const newCartList = targetCart.list.map(item => {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      targetCart.list = [...newCartList];
    }

    if (!isPutReq) {
      targetCart.list.push(cartItem);
    }

    console.log(targetCart);

    setLocalStorageCartList(mockCartLists);

    return res(ctx.status(200));
  }),

  rest.delete(`${LOCAL_BASE_URL}/cart/:id`, (req, res, ctx) => {
    const token = req.headers.get('Authorization');

    if (token === 'null') {
      return res(ctx.status(200));
    }

    const targetUser = mockUserList.find(user => user.token === token);
    const targetCart = mockCartLists.find(cartList => cartList.userEmail === targetUser.email);

    const deleteId = Number(req.params.id);

    const newCartList = targetCart.list.filter(item => item.id !== deleteId);

    targetCart.list = [...newCartList];
    setLocalStorageCartList(mockCartLists);

    return res(ctx.status(200));*/

    return res(ctx.status(200));
  }),

  rest.put<CartItem>(`${LOCAL_BASE_URL}/cart/:id`, (req, res, ctx) => {
    /*const token = req.headers.get('Authorization');

    if (token === 'null') {
      return res(ctx.status(200));
    }

    const targetUser = mockUserList.find(user => user.token === token);
    const targetCart = mockCartLists.find(cartList => cartList.userEmail === targetUser.email);

    const cartItem: CartItem = req.body;

    const newCartList = targetCart.list.map(item => {
      if (item.id === cartItem.id) {
        return { ...cartItem };
      }

      return item;
    });

    targetCart.list = [...newCartList];
    setLocalStorageCartList(mockCartLists);

    return res(ctx.status(200), ctx.json(cartItem));*/

    return res(ctx.status(200));
  }),
];
