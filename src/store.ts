import { IStore } from "../typing";

const store: IStore = {
  origin: {},
  sorted: [],
};

const list = () => {
  const {
    sorted,
  } = store;
  return sorted;
};

const save = (key: string, value: object) => {
  store.origin[key] = {
    ...value,
    key,
  };
};

const sort = (key: string | number, order = 'DESC') => {
  const arrayList = Object.values(store.origin);
  arrayList.sort((prev, next) => {
    if (order === 'ASC') {
      return prev[key] - next[key];
    }
    return next[key] - prev[key];
  });
  store.sorted = arrayList;
};

export default {
  list,
  save,
  sort,
};
