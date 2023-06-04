let debounceId: ReturnType<typeof setTimeout> | null = null;

export const debounce = (callback: VoidFunction) => {
  return () => {
    if (debounceId) clearTimeout(debounceId);

    debounceId = setTimeout(callback, 400);
  };
};
