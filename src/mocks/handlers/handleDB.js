const handleDB = (key) => {
  let data = JSON.parse(window.localStorage.getItem(key)) || [];

  const getData = () => data;
  const setData = (newData) => {
    data = newData;
    window.localStorage.setItem(key, JSON.stringify(newData));
  };

  return [getData, setData];
};

export default handleDB;
