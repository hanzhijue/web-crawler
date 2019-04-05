const store = {
  origin: {},
  sorted: undefined,
};

const list = () => {
  const {
    origin,
    sorted,
  } = store;
  return sorted || origin;
};

const save = (key, value) => {
  store.origin[key] = {
    ...value,
    key,
  };
};

const sort = (key, order = 'DESC') => {
  const arrayList = Object.values(store.origin);
  arrayList.sort((prev, next) => {
    if (order === 'ASC') {
      return prev[key] - next[key];
    }
    return next[key] - prev[key];
  });
  store.sorted = arrayList;
};

module.exports = {
  list,
  save,
  sort,
};
