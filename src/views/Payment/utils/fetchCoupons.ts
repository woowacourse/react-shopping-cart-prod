const fetchCoupons = ({ resource, credential }: { resource: string; credential: string }) => {
  return fetch(resource, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credential}`,
    },
  });
};

export default fetchCoupons;
