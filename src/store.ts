import { IStore } from '../typing/store';

const store: IStore = {
  origin: {},
  sorted: [],
};

const list = () => {
  const {
    origin,
    sorted,
  } = store;
  if (sorted.length === 0) {
    return Object.keys(origin).map((key) => ({
      ...origin[key],
      key,
    }));
  }
  return sorted;
};

const save = (key: string, value: object) => {
  store.origin[key] = {
    ...value,
    key,
  };
};

export enum ISortType {
  ASC,
  DESC,
}

const sort = (key: string, order: ISortType = ISortType.DESC) => {
  const arrayList = Object.values(store.origin);
  arrayList.sort((prev, next) => {
    if (order === ISortType.ASC) {
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
