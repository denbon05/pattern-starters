const sum = (a, b) => {
  console.log('sum is on!');
  return a + b;
};

const memoize = (fn: Function) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args); // expensive

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  };
};

// https://lodash.com/docs/4.17.15#memoize
const memoSum = memoize(sum);

memoSum(2, 2);
memoSum(2, 2);
memoSum(2, 2);

memoSum(2, 23);
memoSum(2, 23);
