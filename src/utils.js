import Chance from "chance";

export const generateTodos = (n = 1000) => {
  const chance = new Chance();
  const priority = ["high", "middle", "low"];
  const todos = Array.from({ length: n }, () => ({
    id: chance.hammertime(),
    main: chance.sentence({ words: 3 }),
    description: chance.sentence({ words: 8 }),
    done: chance.bool(),
    severity: priority[chance.natural({ min: 0, max: 2 })],
  }));

  return todos;
};
export const debounce = (func, delay) => {
  let timeout;
  return (...arg) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...arg);
    }, delay);
  };
};
