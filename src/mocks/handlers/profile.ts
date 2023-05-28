import rest from '../rest';

export const handlers = [
  rest.get('/profile', (req, res) => {
    const { profile } = req;

    return res(res.response(200, profile));
  }),
];
