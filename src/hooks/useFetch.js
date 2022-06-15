import { useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState('false');
  const [payload, setPayload] = useState({});
  const [error, setError] = useState('');

  const fetch = async (cb) => {
    setLoading(true);
    try {
      const { data } = await cb();
      setPayload(data);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetch, payload, error };
};

export default useFetch;
