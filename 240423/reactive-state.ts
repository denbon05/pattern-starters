// https://immerjs.github.io/immer/

const obj = {
  a: 'AAAA',
  b: 123,
  c: [12, 34],
};

const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    console.log('get', { prop, receiver });
    return target[prop];
  },

  set(target, prop, newValue, receiver) {
    console.log('set', { prop, newValue, receiver });
    target[prop] = newValue;
    return true;
  },
});

proxy.b;
proxy['a'] = 'dfsdf';
