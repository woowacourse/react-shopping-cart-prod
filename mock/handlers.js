import { rest } from "msw";
import products from "./products.json";

const findProductById = (productId, products) =>
  products.find(({ id }) => id === productId);

const errorResponse = (
  res,
  { status, errorCode, message = "Something wrong !" }
) => {
  return res((res) => {
    res.status = status;
    res.body = JSON.stringify({
      errorCode,
      message,
    });
    return res;
  });
};

const initialDB = {
  customers: [],
  carts: [],
  orders: [],
};

const localStorageKey = "woo-shop-msw-localstorage-key";
class LocalStorage {
  static db = null;

  static getInstance(key = localStorageKey) {
    if (this.db) return this.db;
    return JSON.parse(
      window.localStorage.getItem(key) ?? JSON.stringify(initialDB)
    );
  }

  static saveInstance(db, key = localStorageKey) {
    window.localStorage.setItem(key, JSON.stringify(db));
    this.db = db;
    return this.db;
  }

  static getItem(itemKey) {
    const db = this.getInstance();
    return db[itemKey];
  }

  static setItem(itemKey, value) {
    const db = this.getInstance();
    db[itemKey] = value;
    return this.saveInstance(db);
  }
}

function isSignedupUser(email, _db) {
  const db = _db ?? LocalStorage.getInstance();
  return db.customers.some((customer) => customer.email === email);
}

function isValidUser({ email, password }, _db) {
  const db = _db ?? LocalStorage.getInstance();
  return db.customers.some(
    (customer) => customer.email === email && customer.password === password
  );
}

export const handlers = [
  // 상품 목록 불러오기
  rest.get("/api/products", (req, res, ctx) => {
    return res(ctx.json(products));
  }),

  // 상품 단건 조회
  rest.get("/api/products/:id", (req, res, ctx) => {
    const { id: productId } = req.params;
    const product = findProductById(productId, products);
    return res(ctx.json(product));
  }),

  // 장바구니에 처음 추가하는 경우
  rest.post("/api/mycarts", (req, res, ctx) => {
    const {
      headers: { _headers },
    } = req;

    if (!_headers.authorization) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const { productId, quantity } = req.body;

    const db = LocalStorage.getInstance();
    const alreadyExist = db.carts.some(
      (cartItem) => cartItem.productId === productId
    );

    if (alreadyExist) {
      return errorResponse(res, {
        status: 400,
        errorCode: 5001,
        message: "Already Exist",
      });
    }

    const product = findProductById(productId, products);
    const cartItem = {
      id: product.id,
      productId: product.id,
      price: product.price,
      name: product.name,
      quantity,
      thumbnailImage: structuredClone(product.thumbnailImage),
    };

    db.carts.push(cartItem);
    LocalStorage.saveInstance(db);

    return res(ctx.json(cartItem));
  }),

  // 장바구니 목록을 조회한다
  rest.get("/api/mycarts", (req, res, ctx) => {
    const {
      headers: { _headers },
    } = req;

    if (!_headers.authorization) {
      return errorResponse(res, {
        status: 401,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const carts = LocalStorage.getItem("carts");
    return res(ctx.json(carts));
  }),

  // 장바구니에 있는 상품의 개수를 업데이트 한다
  rest.patch("/api/mycarts", (req, res, ctx) => {
    const {
      headers: { _headers },
    } = req;

    if (!_headers.authorization) {
      return errorResponse(res, {
        status: 401,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const { cartItemId, quantity } = req.body;
    const db = LocalStorage.getInstance();
    const index = db.carts.findIndex((cartItem) => cartItem.id === cartItemId);
    db.carts[index].quantity = quantity;
    LocalStorage.saveInstance(db);

    return res(ctx.status(201));
  }),

  // 장바구니에 있는 상품을 삭제한다
  rest.delete("/api/mycarts", (req, res, ctx) => {
    const { cartItemIds } = req.body;
    const db = LocalStorage.getInstance();
    const newCart = db.carts.reduce((acc, cartItem) => {
      const shouldBeDeleted = cartItemIds.some((id) => cartItem.id === id);
      if (!shouldBeDeleted) {
        acc.push(cartItem);
      }
      return acc;
    }, []);
    db.carts = newCart;
    LocalStorage.saveInstance(db);
    return res(ctx.status(204));
  }),

  // 주문을 한다
  rest.post("/api/myorders", (req, res, ctx) => {
    const { cartItemIds } = JSON.parse(req.body);
    const db = LocalStorage.getInstance();
    const orderedCartItemList = db.carts.reduce((acc, cartItem) => {
      const isOrderedCartItem = cartItemIds.some((id) => cartItem.id === id);
      if (isOrderedCartItem) {
        acc.push(cartItem);
      }
      return acc;
    }, []);
    const order = {
      id: db.orders.length,
      orderedProducts: orderedCartItemList,
    };
    db.orders.push(order);
    LocalStorage.saveInstance(db);
    return res(ctx.status(201));
  }),

  // 주문 목록을 조회한다
  rest.get("/api/myorders", (req, res, ctx) => {
    const orders = LocalStorage.getItem("orders");
    return res(ctx.json(orders));
  }),

  // 회원가입
  rest.post("/api/customers", (req, res, ctx) => {
    const { email, username, password } = req.body;
    const db = LocalStorage.getInstance();
    if (isSignedupUser(email, db)) {
      return errorResponse(res, {
        status: 400,
        errorCode: 1001,
        message: "Duplicated Email",
      });
    }

    db.customers.push({
      email,
      username,
      password,
    });

    LocalStorage.saveInstance(db);

    return res(ctx.status(301), ctx.set("Location", "/login"));
  }),

  // 로그인
  rest.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!isValidUser({ email, password })) {
      return errorResponse(res, {
        status: 400,
        errorCode: 2001,
        message: "Login Fail",
      });
    }

    return res((res) => {
      res.status = 201;
      res.body = JSON.stringify({
        accessToken: email, // email을 token으로 사용한다
      });
      return res;
    });
  }),

  // 사용자 정보 가져오기
  rest.get("/api/customers/me", (req, res) => {
    const {
      headers: { _headers },
    } = req;

    if (!_headers.authorization) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const { authorization } = _headers;
    const accessToken = authorization.split(" ")[1];
    const email = accessToken;
    const customers = LocalStorage.getItem("customers");
    const userInfo = customers.find((customer) => customer.email === email);

    if (!userInfo) {
      return errorResponse(res, {
        status: 400,
        errorCode: 6004,
        message: "Not Exist Customer",
      });
    }

    return res((res) => {
      res.status = 201;
      res.body = JSON.stringify({
        email: userInfo.email,
        username: userInfo.username,
      });
      return res;
    });
  }),

  // 사용자의 이름 또는 비밀번호를 수정한다
  rest.patch("/api/customers/me", (req, res) => {
    const {
      url,
      headers: { _headers },
    } = req;

    // accessToken 존재 여부 확인
    if (!_headers.authorization) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const target = url.searchParams.get("target");

    const { authorization } = _headers;
    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const email = accessToken;

    const db = LocalStorage.getInstance();
    const customerIndex = db.customers.findIndex(
      (customer) => customer.email === email
    );
    if (customerIndex < 0) {
      return errorResponse(res, {
        status: 400,
        errorCode: 6004,
        message: "Not Exist Customer",
      });
    }

    if (target === "generalInfo") {
      const { username } = req.body;
      db.customers[customerIndex].username = username;
      LocalStorage.saveInstance(db);

      return res((res) => {
        res.status = 201;
        res.body = JSON.stringify({
          email,
          username,
        });
        return res;
      });
    }
    if (target === "password") {
      const { oldPassword, newPassword } = req.body;
      const customer = db.customers[customerIndex];
      if (customer.password !== oldPassword) {
        return errorResponse(res, {
          status: 400,
          errorCode: 3001,
          message: "Incorrect Password",
        });
      }
      customer.password = newPassword;
      LocalStorage.saveInstance(db);

      return res((res) => {
        res.status = 200;
        return res;
      });
    }

    return errorResponse(res, {
      status: 400,
      errorCode: 2001,
      message: "잘못된 요청입니다",
    });
  }),

  // 회원탈퇴
  rest.delete("/api/customers/me", (req, res) => {
    const {
      headers: { _headers },
      body: { password },
    } = req;

    if (!_headers.authorization) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const { authorization } = _headers;
    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3002,
        message: "Invalid token",
      });
    }

    const email = accessToken;

    const db = LocalStorage.getInstance();
    const customerIndex = db.customers.findIndex(
      (customer) => customer.email === email
    );
    if (customerIndex < 0) {
      return errorResponse(res, {
        status: 400,
        errorCode: 6004,
        message: "Not Exist Customer",
      });
    }

    if (!password) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3001,
        message: "Incorrect Password",
      });
    }

    if (db.customers[customerIndex].password !== password) {
      return errorResponse(res, {
        status: 400,
        errorCode: 3001,
        message: "Incorrect Password",
      });
    }

    db.customers.splice(customerIndex, 1);
    LocalStorage.saveInstance(db);

    return res((res) => {
      res.status = 200;
      return res;
    });
  }),

  // product list를 요청한다 (상품 리스트 페이지)
  // product id를 요청한다(상품 상세 페이지)
  rest.get("/product/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // cart에 담긴 product-list를 요청한다 (장바구니 페이지)
  rest.post("cart/add/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
