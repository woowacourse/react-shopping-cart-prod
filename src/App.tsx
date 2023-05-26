import { RecoilRoot } from 'recoil';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import { Cart } from './pages/Cart';
import { useEffect } from 'react';
import { base64 } from './constants/user';
import { Test } from './pages/Test';

export const App = () => {
  useEffect(() => {
    fetch('/point', {
      method: 'GET',
      headers: { Autorization: `Basic ${base64}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    fetch('/cart-items', {
      method: 'GET',
      headers: { Autorization: `Basic ${base64}` },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    // fetch('/orders', {
    //   method: 'POST',
    //   headers: {
    //     Autorization: `Basic ${base64}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     order: [0.8227432798398149, 0.057408573525489226, 0.8535072701976243],
    //     originalPrice: 10000,
    //     usedPoint: 1000,
    //     pointToAdd: 500,
    //   }),
    // }).then((response) => {
    //   const orderId = response.headers.get('Location')?.replace('/orders/', '');

    //   console.log(`반환된 주문 id: ${orderId}`);
    // });

    fetch('/orders')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
