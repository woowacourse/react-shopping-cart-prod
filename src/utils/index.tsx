export const { generateNonDuplicatedId } = (function () {
  const history: Set<number> = new Set();

  function generateId(): number {
    return Math.random() * 1000000;
  }

  return {
    generateNonDuplicatedId(): number {
      let id = generateId();
      while (history.has(id)) {
        id = generateId();
      }
      history.add(id);
      return id;
    },
  };
})();
