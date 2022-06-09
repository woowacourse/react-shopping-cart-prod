import { rest } from 'msw';

const products = [
  {
    id: 1,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/52afbaa7-809e-4e55-8080-3c357a94ba3a.gif',
    name: '배달이친구들 케이블타이',
    price: 4000,
  },
  {
    id: 2,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/f65ec0ec-ea5f-41bb-ba43-68579fbcf34a.png',
    name: '을지로 목장갑. 위잉 뚝딱',
    price: 6000,
  },
  {
    id: 3,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/526c13d0-5e85-438e-ae0b-ad91ac026eb9.gif',
    name: '배달이 친구들 팝업카드',
    price: 4000,
  },
  {
    id: 4,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/835c5ad8-22b6-4556-b3bd-a4e843c1190b.png',
    name: '유해물질이 나오지 않는 지우개',
    price: 1000,
  },
  {
    id: 5,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/a7e6cb1b-0929-46db-8434-208c65a6cbc5.png',
    name: '떡볶이키트. 떡볶이가 필요해',
    price: 11000,
  },
  {
    id: 6,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/b77cdcf9-3410-4122-9e5e-435a9724bff7.png',
    name: '포스터. 독고배달이',
    price: 2000,
  },
  {
    id: 7,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/401a94ad-fe25-4176-951b-2ea7cf4f989e.png',
    name: '배달이친구들 지금뭐해 피규어. 메이의 감미로운 오후',
    price: 3500,
  },
  {
    id: 8,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/0d5029a4-f153-4b13-9b46-ab16792a573e.png',
    name: '배달이친구들 지금뭐해 피규어. 독고의 책읽는 시간',
    price: 3500,
  },
  {
    id: 9,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/4c9e2976-e2c1-453a-bd3c-6f96a132ee7b.png',
    name: '배달이친구들 지금뭐해 피규어. 냥이의 등 긁는 하루',
    price: 3500,
  },
  {
    id: 10,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/21cb8a0e-3aa4-464e-9354-104030c54294.png',
    name: '배달이친구들 지금뭐해 피규어. 감자의 수확하는 계절',
    price: 3500,
  },
  {
    id: 11,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/52e07957-c5ab-4f0c-862b-9dc6318dfffa.png',
    name: '엽서. 복',
    price: 1000,
  },
  {
    id: 12,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/3a9fd048-ffc5-49ac-8a77-5428429ea635.png',
    name: '엽서. 축',
    price: 1000,
  },
  {
    id: 13,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9xJnPGNcWh7xDy4Hqrfn8XmlHrRzAVsJbf4T83d9RRp7KWnN_ikhcklwLW-FUoaEcp4&usqp=CAU',
    name: '발로텔리',
    price: 30000,
  },
  {
    id: 14,
    name: '박수',
    price: 40000,
    imageUrl:
      'https://i.pinimg.com/564x/f9/b2/7a/f9b27aabcc32aa1bf54c24fc0684754c.jpg',
  },
  {
    id: 15,
    name: '망고망고',
    price: 8000,
    imageUrl:
      'https://i.pinimg.com/564x/b0/90/46/b090468ec7086ce9436b19d77dc2d84d.jpg',
  },
  {
    id: 16,
    name: '체리',
    price: 3000,
    imageUrl:
      'https://i.pinimg.com/564x/f4/99/13/f49913dff3762b7c9ed8ab8ac24a289c.jpg',
  },
  {
    id: 17,
    name: '귤',
    price: 3000,
    imageUrl:
      'https://i.pinimg.com/564x/eb/de/88/ebde88df529864dfac176e471cce59c4.jpg',
  },
  {
    id: 18,
    name: '딸기',
    price: 900,
    imageUrl:
      'https://i.pinimg.com/736x/2a/dc/0c/2adc0ccdcc48c2a308a71a060e486953.jpg',
  },
  {
    id: 19,
    name: '코코넛',
    price: 14000,
    imageUrl:
      'https://i.pinimg.com/564x/96/a9/56/96a95673ce630df8a78b00f0e2bebf9e.jpg',
  },
  {
    id: 20,
    name: '사과',
    price: 2000,
    imageUrl:
      'https://i.pinimg.com/564x/5e/d5/40/5ed540c5f50aa0588fb2a28155846d9e.jpg',
  },
  {
    id: 21,
    name: '포도',
    price: 5000,
    imageUrl:
      'https://i.pinimg.com/564x/7b/1c/27/7b1c2770a37adbd513b214fe6e9c87a4.jpg',
  },
  {
    id: 22,
    name: '바나나',
    price: 2000,
    imageUrl:
      'https://i.pinimg.com/564x/35/04/a1/3504a1ef61f1edeb654a421ed5fd6203.jpg',
  },
  {
    id: 23,
    name: '블루베리',
    price: 700,
    imageUrl:
      'https://i.pinimg.com/564x/9d/7a/8c/9d7a8cdfdcf015bb6516e8469241478a.jpg',
  },
  {
    id: 24,
    name: '토마토',
    price: 3000,
    imageUrl:
      'https://i.pinimg.com/564x/d9/54/6b/d9546bf783d822104122aaba5227ac5c.jpg',
  },
  {
    id: 25,
    name: '양파',
    price: 800,
    imageUrl:
      'https://i.pinimg.com/564x/5a/fa/d0/5afad01b38d327252f8204775cf4c57d.jpg',
  },
  {
    id: 26,
    name: '양배추',
    price: 800,
    imageUrl:
      'https://i.pinimg.com/564x/b6/79/54/b67954a7113e1fb688b43eb51477fc3a.jpg',
  },
  {
    id: 27,
    name: '완두콩',
    price: 300,
    imageUrl:
      'https://i.pinimg.com/564x/9c/b7/be/9cb7beb2ed288f016d6a7c1e435f5802.jpg',
  },
  {
    id: 28,
    name: '완두콩',
    price: 300,
    imageUrl:
      'https://i.pinimg.com/564x/9c/b7/be/9cb7beb2ed288f016d6a7c1e435f5802.jpg',
  },
  {
    id: 29,
    name: '피망',
    price: 700,
    imageUrl:
      'https://i.pinimg.com/564x/fa/be/62/fabe623f1ff43529a34efb8d54059910.jpg',
  },
  {
    id: 30,
    name: '가지',
    price: 1200,
    imageUrl:
      'https://i.pinimg.com/564x/41/1c/a7/411ca783f5d5d360bc96035c9ecdc8d2.jpg',
  },
  {
    id: 31,
    name: '아스파라거스',
    price: 1200,
    imageUrl:
      'https://i.pinimg.com/564x/e2/2b/38/e22b38050a7c3b7b25a1ba0852065a25.jpg',
  },
  {
    id: 32,
    name: '당근',
    price: 600,
    imageUrl:
      'https://i.pinimg.com/564x/ba/a3/7b/baa37b851e4085d5f0902ad0abedb48f.jpg',
  },
  {
    id: 33,
    name: '옥수수',
    price: 1200,
    imageUrl:
      'https://i.pinimg.com/564x/29/df/bb/29dfbbd67ecbc32862c58d27787400a2.jpg',
  },
  {
    id: 34,
    name: '아보카도',
    price: 1500,
    imageUrl:
      'https://i.pinimg.com/564x/19/a4/77/19a4774da186bed89010e807b2d485a2.jpg',
  },
  {
    id: 35,
    name: '버섯',
    price: 600,
    imageUrl:
      'https://i.pinimg.com/564x/3d/30/5b/3d305b7e47a094b5001847f86ccdd153.jpg',
  },
  {
    id: 36,
    name: '파프리카',
    price: 600,
    imageUrl:
      'https://i.pinimg.com/564x/69/82/b4/6982b4d88581775389ea992abc3d70ec.jpg',
  },
  {
    id: 37,
    name: '청포도',
    price: 2400,
    imageUrl:
      'https://i.pinimg.com/564x/71/ac/91/71ac91b4238e4fc66b97fc0b5c575c4c.jpg',
  },
  {
    id: 38,
    name: '파인애플',
    price: 2400,
    imageUrl:
      'https://i.pinimg.com/564x/3e/3b/cf/3e3bcf67610b16b49bc6de0ff019b96a.jpg',
  },
  {
    id: 39,
    name: '복숭아',
    price: 1100,
    imageUrl:
      'https://i.pinimg.com/736x/c9/bd/0e/c9bd0e8479515766dbbac8c945831d4f.jpg',
  },
  {
    id: 40,
    name: '키위',
    price: 1400,
    imageUrl:
      'https://i.pinimg.com/564x/8a/86/58/8a86580bfc3ae0808b9b2d49a72ba6c2.jpg',
  },
  {
    id: 41,
    name: '레몬',
    price: 800,
    imageUrl:
      'https://i.pinimg.com/564x/b0/64/76/b06476605329486faee7d68a1fd5d52c.jpg',
  },
];
let carts = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  rest.get('/products/:page', (req, res, ctx) => {
    const page = Number(req.params.page);
    const offset = (page - 1) * 10;
    const productsSlice = products.slice(offset, offset + 10);

    return res(
      ctx.status(200),
      ctx.json({ products: productsSlice, totalCount: products.length }),
    );
  }),

  rest.get('/product/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const product = products.find(({ id }) => id === productId);

    return res(ctx.status(200), ctx.json(product));
  }),

  rest.get('/carts', (req, res, ctx) => {
    const result = carts.map(({ productId, quantity }) => ({
      ...products.find((product) => product.id === productId),
      quantity,
      selected: false,
    }));

    return res(ctx.status(200), ctx.json(result));
  }),

  rest.get('/cart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const cart = carts.find((cart) => cart.productId === productId);

    return res(ctx.status(200), ctx.json(cart));
  }),

  rest.post('/addCart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);

    carts.push({ productId, quantity: 1 });

    return res(ctx.status(201));
  }),

  rest.put('/modifyCartQuantity', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const product = products.find(({ id }) => id === productId);

    if (!product) {
      return res(ctx.status(403, '상품 없다구!'));
    }

    product.quantity = Number(req.params.quantity);

    return res(ctx.status(200));
  }),

  rest.delete('/deleteCart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);

    carts = carts.filter((cart) => cart.productId !== productId);

    return res(ctx.status(200));
  }),

  rest.delete('/deleteCarts', (req, res, ctx) => {
    const productIds = req.body;

    carts = carts.filter(({ productId }) => !productIds.includes(productId));

    return res(ctx.status(200));
  }),
];
