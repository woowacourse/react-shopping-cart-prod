import { rest } from 'msw';

import { API_ENDPOINT } from 'api/constants';
import { BASE_URL } from 'api/customInstance';

import data from 'mocks/data';
import images from 'mocks/images';

const handleGetProductsRequest = (req, res, ctx) => {
  const page = req.url.searchParams.get('page');
  const limit = req.url.searchParams.get('limit');

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const productList = data.products.slice(startIndex, endIndex);
  const productTotalCount = data.products.length;

  return res(
    ctx.status(200),
    ctx.json(productList),
    ctx.set('x-total-count', productTotalCount),
  );
};

const handleGetImageRequest = async (req, res, ctx) => {
  const { imageFileName } = req.params;
  const imageName = imageFileName.split('.')[0];

  const imageBuffer = await fetch(images[`${imageName}`]).then((res) =>
    res.arrayBuffer(),
  );

  return res(
    ctx.set('Content-Length', imageBuffer.byteLength.toString()),
    ctx.set('Content-Type', 'image/jpeg'),
    ctx.body(imageBuffer),
  );
};

export default [
  rest.get(`${BASE_URL}${API_ENDPOINT.PRODUCTS}`, handleGetProductsRequest),
  rest.get(`${BASE_URL}/static/images/:imageFileName`, handleGetImageRequest),
];
