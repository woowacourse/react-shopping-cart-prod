import { rest } from 'msw';

const API_URL = '/api';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjUzODIwOTg2LCJleHAiOjE2NTM4MjQ1ODZ9.le7-3iZnWEAn1OwoMnIJl8UXfg1t5Tnpog58kV89f1c';

const user = {
  id: 1,
  email: 'member@gmail.com',
  name: 'member',
};
export const handlers = [
  rest.post(`${API_URL}/auth`, (req, res, ctx) => {
    return res(ctx.status(200, 'OK'), ctx.json({ accessToken }));
  }),

  rest.post(`${API_URL}/members/duplicate-email`, (req, res, ctx) => {
    return res(ctx.status(200, 'OK'));
  }),

  rest.post(`${API_URL}/members`, (req, res, ctx) => {
    return res(ctx.status(201, 'Created'));
  }),

  rest.get(`${API_URL}/members/me`, (req, res, ctx) => {
    return res(ctx.status(200, 'OK'), ctx.json({ ...user }));
  }),

  rest.put(`${API_URL}/members/me/name`, (req, res, ctx) => {
    return res(ctx.status(200, 'OK'));
  }),

  rest.put(`${API_URL}/members/me/password`, (req, res, ctx) => {
    return res(ctx.status(200, 'OK'));
  }),

  rest.delete(`${API_URL}/members/me`, (req, res, ctx) => {
    return res(ctx.status(204, 'No Content'));
  }),
];
