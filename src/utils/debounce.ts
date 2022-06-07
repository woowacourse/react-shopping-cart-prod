export const debounce = (callback, delay: number) => {
  let timer: NodeJS.Timeout | null;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delay, ...args);
  };
};
